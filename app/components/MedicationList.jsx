import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../config/FirebaseConfig";
import Colors from "../constant/Colors";
import { getDateRangeToDisplay } from "../service/ConvertDateTime";
import { getLocalStorage } from "../service/Storage";
import MedicationCardItem from "./MedicationCardItem";
import { responsiveSize } from "../service/CalculateResponsiveSize";
import { router, useRouter } from "expo-router";
import EmptyState from "./EmptyState";

export default function MedicationList() {
  const [medList, setMedList] = useState();
  const [dateRange, setDateRange] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );

  useEffect(() => {
    getDateRangeList();
    getMedicationList(selectedDate);
  }, []);

  const getDateRangeList = () => {
    const dRange = getDateRangeToDisplay();
    setDateRange(dRange);
  };

  const getMedicationList = async (selectedDate) => {
    setLoading(true);
    const user = await getLocalStorage("userDetail");

    try {
      const q = query(
        collection(db, "medication"),
        where("userEmail", "==", user?.email),
        where("dates", "array-contains", selectedDate)
      );

      const querySnapshot = await getDocs(q);
      setMedList([]);
      querySnapshot.forEach((doc) => {
        setMedList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={{ marginTop: responsiveSize(25), flex: 1 }}>
      <Image
        source={require("../assets/images/medication.jpeg")}
        style={{
          width: "100%",
          height: responsiveSize(200),
          borderRadius: responsiveSize(15),
        }}
      />

      <View>
        <FlatList
          style={{ marginTop: responsiveSize(15) }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dateRange}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedDate(item.formattedDate);
                getMedicationList(selectedDate);
              }}
              style={[
                styles.dateGroup,
                {
                  backgroundColor:
                    item.formattedDate == selectedDate
                      ? Colors.PRIMARY
                      : Colors.LIGHT_GRAY_BORDER,
                },
              ]}
            >
              <Text
                style={[
                  styles.day,
                  {
                    color:
                      item.formattedDate == selectedDate ? "white" : "black",
                  },
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.date,
                  {
                    color:
                      item.formattedDate == selectedDate ? "white" : "black",
                  },
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          color="#808080"
          size="large"
          style={{ margin: "auto" }}
        />
      ) : medList?.length > 0 ? (
        <FlatList
          data={medList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/action-modal",
                  params: {
                    ...item,
                    selectedDate: selectedDate,
                  },
                })
              }
            >
              <MedicationCardItem medicine={item} selectedDate={selectedDate} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateGroup: {
    padding: responsiveSize(10),
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
    display: "flex",
    alignItems: "center",
    marginRight: responsiveSize(10),
    borderRadius: responsiveSize(10),
  },
  day: {
    fontSize: responsiveSize(20),
  },
  date: {
    fontSize: responsiveSize(26),
    fontWeight: "bold",
  },
});
