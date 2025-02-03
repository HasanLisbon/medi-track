import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constant/Colors";
import { TypeList, WhenToTake } from "../constant/Options";
import RNPickerSelect from "react-native-picker-select";
import DropdownPicker from "./DropdownPicker";

export default function AddMedicationForm() {
  const [formData, setFormData] = useState();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
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
          placeholder="Select and option"
          value={formData?.when}
          data={WhenToTake}
          onChange={(itemValue, itemIndex) =>
            onHandleInputChange("when", itemValue)
          }
        />
      </View>
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
});
