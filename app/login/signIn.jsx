import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { auth } from "../../config/FirebaseConfig";
import { useToast } from "react-native-toast-notifications";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setLocalStorage } from "../service/Storage";

export default function SignIn() {
  const router = useRouter();
  const firebaseAuth = auth;
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onLogin = () => {
    if (!email || !password) {
      toast.show("Please enter email and password", {
        type: "warning",
        placement: "top",
        duration: 5000,
        animationType: "slide-in",
      });
      return;
    }

    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await setLocalStorage("userDetail", user);
        router.replace("(tabs)");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessages = {
          "auth/invalid-email": "Email address is not valid",
          "auth/user-disabled": "User account has been disabled",
          "auth/invalid-credential": "Email or Password is wrong",
        };
        toast.show(errorMessages[errorCode] || "An unknown error occurred", {
          type: "danger",
          placement: "top",
          duration: 5000,
          animationType: "slide-in",
        });
      });
  };

  return (
    <View className="p-6">
      <Text className="text-[25px] font-bold">Let's Sign You In</Text>
      <Text className="text-[25px] mt-[10px] text-gray-400 font-bold">
        Welcome Back
      </Text>
      <Text className="text-[25px] mt-[10px] text-gray-400 font-bold">
        You've been missed!
      </Text>

      <View className="mt-6">
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"#9ca3af"}
          className="p-[10px] border-black border-[1px] text-[17px] rounded-[10px] mt-1"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
      </View>

      <View className="mt-6">
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={"#9ca3af"}
          className="p-[10px] border-black border-[1px] text-[17px] rounded-[10px] mt-1"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
      </View>

      <TouchableOpacity
        className="p-4 bg-blue-500 rounded-[10px] mt-9"
        onPress={() => onLogin()}
      >
        <Text className="text-white text-[17px] text-center">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-4 bg-white rounded-[10px] mt-5 border-blue-500 border-[1px]"
        onPress={() => router.push("login/signUp")}
      >
        <Text className="text-blue-500 text-[17px] text-center">
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}
