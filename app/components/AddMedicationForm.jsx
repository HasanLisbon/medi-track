import { View, Text, TextInput } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AddMedicationForm() {
  return (
    <View className="p-6">
      <Text className="text-[1.567rem] font-bold">Add New Medication</Text>
      <View>
        <Ionicons name="medkit-outline" size={24} color="black" />
        <TextInput placeholder="Medicine Name" placeholderTextColor="gray" />
      </View>
    </View>
  );
}
