import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();
  return (
    <View className="p-6">
      <Text className="text-[25px] font-bold">Create New Account</Text>

      <View className="mt-6">
        <Text>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor={"#9ca3af"}
          className="p-[10px] border-black border-[1px] text-[17px] rounded-[10px] mt-1"
        ></TextInput>
      </View>

      <View className="mt-6">
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"#9ca3af"}
          className="p-[10px] border-black border-[1px] text-[17px] rounded-[10px] mt-1"
        ></TextInput>
      </View>

      <View className="mt-6">
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={"#9ca3af"}
          className="p-[10px] border-black border-[1px] text-[17px] rounded-[10px] mt-1"
        ></TextInput>
      </View>

      <TouchableOpacity className="p-4 bg-blue-500 rounded-[10px] mt-9">
        <Text className="text-white text-[17px] text-center">
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-4 bg-white rounded-[10px] mt-5 border-blue-500 border-[1px]"
        onPress={() => router.push("login/signUp")}
      >
        <Text
          className="text-blue-500 text-[17px] text-center"
          onPress={() => router.push("login/signIn")}
        >
          Already account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
