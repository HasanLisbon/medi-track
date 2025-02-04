import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constant/Colors";
import { TypeList, WhenToTake } from "../constant/Options";
import RNPickerSelect from "react-native-picker-select";
import DropdownPicker from "./DropdownPicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  fomratDateForText,
  FormatDate,
  formatTime,
} from "../service/ConvertDateTime";
import { getFontSize } from "../service/CalculateResponsiveSize";
import { db } from "../../config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getLocalStorage } from "../service/Storage";
import { useToast } from "react-native-toast-notifications";

export default function AddMedicationForm() {
  const [formData, setFormData] = useState();
  const [showStartDate, setShowStartDate] = useState();
  const [showEndDate, setShowEndDate] = useState();
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toast = useToast();

  const onHandleInputChange = (field, value) => {
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

    try {
      await setDoc(doc(db, "medication", docId), {
        ...formData,
        userEmail: user?.email,
        docId: docId,
      });
      console.log("Data Saved!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ padding: 25 }}>
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
          marginTop: 5,
        }}
        data={TypeList}
        horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onHandleInputChange("type", item)}
            style={[
              styles.inputGroup,
              { marginRight: 10 },
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
            size={24}
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
            size={24}
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
            size={24}
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
        <Text style={styles.buttonText}>Add New Medication</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inputGroup: {
    borderColor: Colors.LIGHT_GRAY_BORDER,
    borderWidth: 1,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    minHeight: 50,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 10,
    paddingLeft: 12,
    borderColor: Colors.LIGHT_GRAY_BORDER,
  },
  typeText: {
    fontSize: 16,
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    fontSize: getFontSize(16),
    padding: 5,
    flex: 1,
    marginLeft: 10,
  },

  dateInputGroup: {
    flexDirection: "row",
    gap: 10,
  },

  button: {
    marginTop: getFontSize(20),
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: "100%",
  },

  buttonText: {
    fontSize: getFontSize(17),
    color: "white",
    textAlign: "center",
  },
});
