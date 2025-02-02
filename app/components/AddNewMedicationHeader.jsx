import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function AddNewMedicationHeader() {
  const router = useRouter();
  return (
    <View>
      <Image
        source={require("./../assets/images/consult.png")}
        className="h-[18.8rem] w-full"
      />
      <TouchableOpacity
        className="absolute p-6"
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
