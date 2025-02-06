import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { Platform, View } from "react-native";
import { auth } from "../../config/FirebaseConfig";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";
import MedicationList from "../components/MedicationList";
import { responsiveSize } from "../service/CalculateResponsiveSize";
import { RemoveLocalStorage } from "../service/Storage";

export default function HomeScreen() {
  const router = useRouter();
  const showEmptyState = false;
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
        marginTop: Platform.OS === "ios" ? responsiveSize(30) : 0,
        paddingTop: Platform.OS === "ios" ? 0 : 0,
      }}
    >
      <Header />
      {showEmptyState ? <EmptyState /> : <MedicationList />}
    </View>
  );
}
