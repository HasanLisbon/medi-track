import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function EmptyState() {
  const router = useRouter();
  return (
    <View className="flex items-center">
      <Image
        source={require("./../assets/images/medicine.png")}
        className="w-[50vw] h-[50vw]"
      />
      <Text className="text-[1.875rem] font-bold mt-7">No Medications!</Text>
      <Text className="text-[1rem] text-center mt-5 text-gray-500">
        You have 0 medications setup, kindly setup a new one
      </Text>
      <TouchableOpacity
        className="p-4 bg-blue-500 rounded-3xl w-full mt-7"
        onPress={() => {
          router.push("/add-new-medication");
        }}
      >
        <Text className="text-center text-[1rem] text-white">
          + Add New Medication
        </Text>
      </TouchableOpacity>
    </View>
  );
}
