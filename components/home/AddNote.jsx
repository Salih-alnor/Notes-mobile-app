import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import plus from "../../assets/icons/plus.png";
import { useNavigation } from "@react-navigation/native";

const AddNote = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.addNoteBtn}
      onPress={() => navigation.replace("add-note")}
    >
      <Image
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          tintColor: "#666",
        }}
        source={plus}
      />
    </TouchableOpacity>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  addNoteBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#EEE",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    position: "absolute",
    bottom: 20,
    left: 25,
    zIndex: 999,
  },
});
