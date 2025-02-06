import React from "react";
import { Platform, Text, View } from "react-native";
import { responsiveSize } from "../service/CalculateResponsiveSize";

export default function Profile() {
  return (
    <View style={{ marginTop: Platform.OS === "ios" ? responsiveSize(60) : 0 }}>
      <Text>Profile</Text>
    </View>
  );
}
