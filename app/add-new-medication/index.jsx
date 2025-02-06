import React from "react";
import { Platform, ScrollView } from "react-native";
import AddMedicationForm from "../components/AddMedicationForm";
import AddNewMedicationHeader from "../components/AddNewMedicationHeader";
import { responsiveSize } from "../service/CalculateResponsiveSize";

export default function AddNewMedication() {
  return (
    <ScrollView
      style={{ marginTop: Platform.OS === "ios" ? responsiveSize(60) : 0 }}
    >
      <AddNewMedicationHeader />
      <AddMedicationForm />
    </ScrollView>
  );
}
