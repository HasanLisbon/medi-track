import { View, Text, Platform } from "react-native";
import React from "react";

export default function AddNew() {
  return (
    <View style={{ marginTop: Platform.OS === "ios" ? 30 : 0 }}>
      <Text>AddNew</Text>
    </View>
  );
}
