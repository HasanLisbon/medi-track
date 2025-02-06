import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constant/Colors";

import Ionicons from "@expo/vector-icons/Ionicons";
import { responsiveSize } from "../service/CalculateResponsiveSize";

export default function MedicationCardItem({ medicine }) {
  console.log("Medicine", medicine);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine?.type?.icon }}
            style={{
              width: responsiveSize(60),
              height: responsiveSize(60),
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: responsiveSize(16), fontWeight: "bold" }}>
            {medicine?.name}
          </Text>
          <Text style={{ fontSize: responsiveSize(12) }}>
            {medicine?.when?.label}
          </Text>
          <Text>
            {medicine?.dose} {medicine?.type?.name}
          </Text>
        </View>
      </View>
      <View style={styles.reminderContainer}>
        <Ionicons
          name="timer-outline"
          size={responsiveSize(24)}
          color="black"
        />
        <Text style={{ fontWeight: "bold", fontSize: responsiveSize(12) }}>
          {medicine?.reminder}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: responsiveSize(10),
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: responsiveSize(10),
    borderRadius: responsiveSize(15),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    padding: responsiveSize(10),
    backgroundColor: "white",
    borderRadius: responsiveSize(15),
    marginRight: responsiveSize(15),
  },

  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  reminderContainer: {
    padding: responsiveSize(13),
    borderRadius: responsiveSize(15),
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
  },
});
