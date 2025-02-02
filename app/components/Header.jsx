import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../service/Storage";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
  const [user, setUser] = useState(null);

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
        <Ionicons name="settings-outline" size={34} color="gray" />
      </View>
    </View>
  );
}
