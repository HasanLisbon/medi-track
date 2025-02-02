import { View, Text, Platform } from "react-native";
import React from "react";
import AddNewMedicationHeader from "../components/AddNewMedicationHeader";
import AddMedicationForm from "../components/AddMedicationForm";

export default function AddNewMedication() {
  return (
    <View style={{ marginTop: Platform.OS === "ios" ? 60 : 0 }}>
      <AddNewMedicationHeader />
      <AddMedicationForm />
    </View>
  );
}
