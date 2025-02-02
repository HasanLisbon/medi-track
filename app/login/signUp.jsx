import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { useToast } from "react-native-toast-notifications";
import { setLocalStorage } from "../service/Storage";

export default function SignUp() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const onCreateAccount = () => {
    if (!email || !password || !name) {
      toast.show("Please fill all fields", {
        type: "warning",
        placement: "top",
        duration: 5000,
        animationType: "slide-in",
      });
      return;
    }
    const firebaseAuth = auth;
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name,
        });
        await setLocalStorage("userDetail", user);
        router.push("(tabs)");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/email-already-in-use") {
          toast.show("Email already in use", {
            type: "danger",
            placement: "top",
            duration: 5000,
            animationType: "slide-in",
          });
        }
      });
  };
  return (
    <View className="p-6">
      <Text className="text-[25px] font-bold">Create New Account</Text>

      <View className="mt-6">
        <Text>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor={"#9ca3af"}
          className="p-[10px] border-black border-[1px] text-[17px] rounded-[10px] mt-1"
          onChangeText={(val) => setName(val)}
        ></TextInput>
      </View>

      <View className="mt-6">
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"#9ca3af"}
          className="p-[10px] border-black border-[1px] text-[17px] rounded-[10px] mt-1"
          onChangeText={(val) => setEmail(val)}
        ></TextInput>
      </View>

      <View className="mt-6">
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={"#9ca3af"}
          className="p-[10px] border-black border-[1px] text-[17px] rounded-[10px] mt-1"
          onChangeText={(val) => setPassword(val)}
        ></TextInput>
      </View>

      <TouchableOpacity
        className="p-4 bg-blue-500 rounded-[10px] mt-9"
        onPress={onCreateAccount}
      >
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
