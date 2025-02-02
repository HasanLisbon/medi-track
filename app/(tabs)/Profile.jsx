import { View, Text, Platform } from "react-native";
import React from "react";

export default function Profile() {
  return (
    <View style={{ marginTop: Platform.OS === "ios" ? 60 : 0 }}>
      <Text>Profile</Text>
    </View>
  );
}
