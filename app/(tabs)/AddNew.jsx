import React from "react";
import { Platform, Text, View } from "react-native";
import { responsiveSize } from "../service/CalculateResponsiveSize";

export default function AddNew() {
  return (
    <View style={{ marginTop: Platform.OS === "ios" ? responsiveSize(30) : 0 }}>
      <Text>AddNew</Text>
    </View>
  );
}
