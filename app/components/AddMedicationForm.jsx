import Ionicons from "@expo/vector-icons/Ionicons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { db } from "../../config/FirebaseConfig";
import Colors from "../constant/Colors";
import { TypeList, WhenToTake } from "../constant/Options";
import {
  getResponsiveSize,
  responsiveSize,
} from "../service/CalculateResponsiveSize";
import {
  fomratDateForText,
  FormatDate,
  formatTime,
  getDatesRange,
} from "../service/ConvertDateTime";
import { getLocalStorage } from "../service/Storage";
import DropdownPicker from "./DropdownPicker";

export default function AddMedicationForm() {
  const [formData, setFormData] = useState();
  const [showStartDate, setShowStartDate] = useState();
  const [showEndDate, setShowEndDate] = useState();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  /*   useEffect(() => {
    onHandleInputChange("startDate", getTimestamp(new Date()));
    onHandleInputChange("endDate", getTimestamp(new Date()));
  }, []); */

  const onHandleInputChange = (field, value) => {
    if (field === "startDate" || field === "endDate") {
      console.log(value);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveMedication = async () => {
    const docId = Date.now().toString();
    const user = await getLocalStorage("userDetail");

    if (
      !(
        formData?.name ||
        formData?.type ||
        formData?.startDate ||
        formData?.endDate ||
        formData?.reminder
      )
    ) {
      toast.show("Enter all fields", {
        type: "warning",
        placement: "top",
        duration: 5000,
        animationType: "slide-in",
      });
      return;
    }

    const dates = getDatesRange(formData?.startDate, formData?.endDate);

    setLoading(true);
    console.log(dates);

    try {
      await setDoc(doc(db, "medication", docId), {
        ...formData,
        userEmail: user?.email,
        dates: dates,
        docId: docId,
      });
      toast.show("New medication added successfully!", {
        type: "success",
        placement: "top",
        duration: 5000,
        animationType: "slide-in",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.show(error.message, {
        type: "danger",
        placement: "top",
        duration: 5000,
        animationType: "slide-in",
      });
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: responsiveSize(25) }}>
      <Text style={styles.header}>Add New Medication</Text>
      <View style={styles.inputGroup}>
        <Ionicons
          name="medkit-outline"
          style={styles.icon}
          size={24}
          color="black"
        />
        <TextInput
          placeholder="Medicine Name"
          placeholderTextColor="#e5e7eb"
          style={styles.textInput}
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>
      {/* Type List */}
      <FlatList
        style={{
          marginTop: responsiveSize(5),
        }}
        data={TypeList}
        horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onHandleInputChange("type", item)}
            style={[
              styles.inputGroup,
              { marginRight: responsiveSize(10) },
              {
                backgroundColor:
                  item.name === formData?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name === formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* Dose */}
      <View style={styles.inputGroup}>
        <Ionicons
          name="eyedrop-outline"
          style={styles.icon}
          size={24}
          color="black"
        />
        <TextInput
          placeholder="Dose Ex. 2, 5ml"
          placeholderTextColor="#e5e7eb"
          style={styles.textInput}
          onChangeText={(value) => onHandleInputChange("dose", value)}
        />
      </View>
      {/* When to take */}
      <View style={[styles.inputGroup, { padding: 0 }]}>
        <Ionicons
          name="time-outline"
          style={styles.icon}
          size={24}
          color="black"
        />
        <DropdownPicker
          placeholder="When To Take"
          value={formData?.when}
          data={WhenToTake}
          onChange={(itemValue, itemIndex) =>
            onHandleInputChange("when", itemValue)
          }
        />
      </View>

      {/* Start Date and end Date */}
      <View style={[styles.dateInputGroup]}>
        {/** Start Date */}
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons
            name="calendar-outline"
            style={styles.icon}
            size={getResponsiveSize(24)}
            color="black"
          />
          <Text style={styles.text}>
            {fomratDateForText(formData?.startDate) ?? "Start Date"}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            style={{ backgroundColor: "white" }}
            textColor="black"
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            value={new Date(formData?.startDate) ?? new Date()}
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "startDate",
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowStartDate(false);
            }}
          />
        )}

        {/** End Date */}
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <Ionicons
            name="calendar-outline"
            style={styles.icon}
            size={responsiveSize(24)}
            color="black"
          />
          <Text style={styles.text}>
            {fomratDateForText(formData?.endDate) ?? "End Date"}
          </Text>
        </TouchableOpacity>
        {showEndDate && (
          <RNDateTimePicker
            style={{ backgroundColor: "white" }}
            textColor="black"
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            value={new Date(formData?.endDate) ?? new Date()}
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "endDate",
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowEndDate(false);
            }}
          />
        )}
      </View>

      {/** Set Reminder INout */}
      <View style={[styles.dateInputGroup]}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons
            name="time-outline"
            style={styles.icon}
            size={responsiveSize(24)}
            color="black"
          />
          <Text style={styles.text}>
            {formData?.reminder ?? "Select Reminder Time"}
          </Text>
        </TouchableOpacity>
      </View>
      {showTimePicker && (
        <RNDateTimePicker
          value={new Date(formData?.reminder) ?? new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "compact" : "default"}
          onChange={(event) => {
            onHandleInputChange(
              "reminder",
              formatTime(event.nativeEvent.timestamp)
            );
            setShowTimePicker(false);
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => saveMedication()}>
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <Text style={styles.buttonText}>Add New Medication</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: responsiveSize(25),
    fontWeight: "bold",
  },
  inputGroup: {
    borderColor: Colors.LIGHT_GRAY_BORDER,
    borderWidth: 1,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsiveSize(10),
    minHeight: responsiveSize(50),
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: getResponsiveSize(16),
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: responsiveSize(10),
    paddingLeft: responsiveSize(12),
    borderColor: Colors.LIGHT_GRAY_BORDER,
  },
  typeText: {
    fontSize: responsiveSize(16),
    paddingLeft: responsiveSize(12),
    paddingRight: responsiveSize(12),
  },
  text: {
    fontSize: responsiveSize(16),
    padding: responsiveSize(5),
    flex: 1,
    marginLeft: responsiveSize(10),
  },

  dateInputGroup: {
    flexDirection: "row",
    gap: responsiveSize(10),
  },

  button: {
    marginTop: responsiveSize(20),
    padding: responsiveSize(15),
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: "100%",
  },

  buttonText: {
    fontSize: responsiveSize(17),
    color: "white",
    textAlign: "center",
  },
});
