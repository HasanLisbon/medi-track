import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { responsiveSize } from "../service/CalculateResponsiveSize";

export default function DropdownPicker({ data, onChange, placeholder }) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const buttonRef = useRef(null);
  const [top, setTop] = useState(0);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const onSelect = useCallback((item) => {
    onChange(item);
    setValue(item.label);
    setExpanded(false);
  }, []);

  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOfComponent = layout.height;

        const finalValue =
          topOffset +
          heightOfComponent +
          (Platform.OS === "android"
            ? responsiveSize(210)
            : responsiveSize(270));

        setTop(finalValue);
      }}
    >
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.text}>{value || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View
                style={[
                  styles.options,
                  {
                    top,
                  },
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    padding: responsiveSize(20),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  optionItem: {
    height: responsiveSize(40),
    justifyContent: "center",
  },
  separator: {
    height: responsiveSize(4),
  },
  options: {
    position: "absolute",
    backgroundColor: "white",
    alignSelf: "center",
    width: "96%",
    padding: responsiveSize(10),
    borderRadius: 6,
    maxHeight: responsiveSize(250),
  },
  text: {
    fontSize: responsiveSize(15),
    opacity: 0.8,
  },
  button: {
    height: responsiveSize(50),
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    paddingHorizontal: responsiveSize(15),
    borderRadius: 8,
  },
});
