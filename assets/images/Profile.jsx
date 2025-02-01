import { View, Text, Image } from "react-native";
import React from "react";

export default function Profile() {
  return (
    <View>
      <View>
        <Image
          source={require("../../assets/images/login.png")}
          className="w-[210px] h-[450px] rounded-[23px]"
        />
      </View>
    </View>
  );
}
