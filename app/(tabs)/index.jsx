import { View, Text, Button, Platform } from "react-native";
import React from "react";
import { Redirect, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { RemoveLocalStorage } from "../service/Storage";
import Header from "../components/Header";
import EmptyState from "../components/EmptyState";

export default function HomeScreen() {
  const router = useRouter();
  const logout = async () => {
    try {
      await RemoveLocalStorage();
      router.replace("/login/signIn");
      return signOut(auth);
    } catch (e) {
      console.log(err);
    }
  };
  return (
    <View
      className="p-6 bg-white h-full"
      style={{
        marginTop: Platform.OS === "ios" ? 30 : 0,
        paddingTop: Platform.OS === "ios" ? 0 : 0,
      }}
    >
      <Header />
      <EmptyState />
    </View>
  );
}
