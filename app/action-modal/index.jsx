import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import {
  getResponsiveSize,
  responsiveSize,
} from "../service/CalculateResponsiveSize";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../constant/Colors";
import MedicationCardItem from "../components/MedicationCardItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import moment from "moment";
import { useToast } from "react-native-toast-notifications";

export default function ActionModal() {
  const medicine = useLocalSearchParams();
  const router = useRouter();

  const toast = useToast();

  const updateActionStatus = async (status) => {
    try {
      const docRef = doc(db, "medication", medicine?.docId);
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format("LT"),
          date: medicine?.selectedDate,
        }),
      });

      Alert.alert(status, "Response Saved!", [
        {
          text: "Ok",
          onPress: () => router.replace("(tabs)"),
        },
      ]);
    } catch (e) {}
  };

  return (
    <View
      style={[
        styles.container,
        { marginTop: Platform.OS === "ios" ? responsiveSize(60) : 0 },
      ]}
    >
      <Image
        source={require("../assets/images/notification.gif")}
        style={{
          width: responsiveSize(120),
          height: responsiveSize(120),
        }}
      />
      <Text style={{ fontSize: getResponsiveSize(18) }}>
        {medicine?.selectedDate}
      </Text>
      <Text
        style={{
          fontSize: getResponsiveSize(38),
          fontWeight: "bold",
          color: Colors.PRIMARY,
        }}
      >
        {medicine?.reminder}
      </Text>
      <Text style={{ fontSize: getResponsiveSize(18) }}>It's time to take</Text>
      <MedicationCardItem medicine={medicine} />

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => updateActionStatus("Missed")}
        >
          <Ionicons
            name="close-outline"
            size={responsiveSize(24)}
            color="red"
          />
          <Text
            style={{
              fontSize: responsiveSize(20),
              color: "red",
            }}
          >
            Missed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.successBtn}
          onPress={() => updateActionStatus("Taken")}
        >
          <Ionicons
            name="checkmark-outline"
            size={responsiveSize(24)}
            color="white"
          />
          <Text
            style={{
              fontSize: responsiveSize(20),
              color: "white",
            }}
          >
            Taken
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          bottom: responsiveSize(80),
        }}
      >
        <Ionicons
          name="close-circle"
          size={responsiveSize(44)}
          color={Colors.GRAY}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: responsiveSize(25),
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "white",
  },
  btnContainer: {
    flexDirection: "row",
    gap: responsiveSize(10),
    marginTop: responsiveSize(25),
  },
  closeBtn: {
    padding: responsiveSize(10),
    flexDirection: "row",
    gap: responsiveSize(6),
    borderWidth: 1,
    alignItems: "center",
    borderColor: "red",
    borderRadius: responsiveSize(10),
  },

  successBtn: {
    padding: responsiveSize(10),
    flexDirection: "row",
    gap: responsiveSize(6),
    backgroundColor: Colors.GREEN,
    alignItems: "center",
    borderColor: "red",
    borderRadius: responsiveSize(10),
  },
});
