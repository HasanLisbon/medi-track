import { View, Text, Platform, ScrollView } from "react-native";
import React from "react";
import AddNewMedicationHeader from "../components/AddNewMedicationHeader";
import AddMedicationForm from "../components/AddMedicationForm";

export default function AddNewMedication() {
  return (
    <ScrollView style={{ marginTop: Platform.OS === "ios" ? 60 : 0 }}>
      <AddNewMedicationHeader />
      <AddMedicationForm />
    </ScrollView>
  );
}
