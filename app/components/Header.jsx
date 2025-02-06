import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getLocalStorage } from "../service/Storage";
import { responsiveSize } from "../service/CalculateResponsiveSize";
import Colors from "../constant/Colors";
import { useRouter } from "expo-router";

export default function Header() {
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    setUser(userInfo);
  };
  return (
    <View className="mt-5 w-[80%] ">
      <View className="flex flex-row justify-between items-center w-full">
        <View className="flex flex-row items-center gap-[.63rem]">
          <Image
            source={require("./../assets/images/smiley.png")}
            className="w-10 h-10"
          />
          <Text className="text-[5vw] font-bold mr-8">
            Hello {user?.displayName} 👋
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/add-new-medication")}>
          <Ionicons
            name="medkit-outline"
            size={responsiveSize(34)}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
