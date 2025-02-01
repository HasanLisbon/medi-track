import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View>
      <View className="flex items-center mt-5">
        <Image
          source={require("../../assets/images/login.png")}
          className="w-[13.5rem] h-[28rem] rounded-[23px]"
        />
      </View>
      <View className="p-6 bg-blue-600 h-full">
        <Text className="text-3xl font-bold text-center text-white">
          Stay on Track, Stay Healthy!
        </Text>
        <Text className="text-white text-center text-[17px] mt-5">
          Track your meds, take control of your health. Stay consistent, stay
          confident
        </Text>
        <TouchableOpacity
          className="p-[.93rem] bg-white rounded-full mt-6"
          onPress={() => router.push("login/signIn")}
        >
          <Text className="text-center text-base text-blue-500">Continue</Text>
        </TouchableOpacity>
        <Text className="text-white mt-1">
          Note: by clicking this button, you will agree to our condition
        </Text>
      </View>
    </View>
  );
}
