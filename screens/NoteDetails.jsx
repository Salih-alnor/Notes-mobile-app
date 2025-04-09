import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import StatusBarComp from "../components/StatusBar";
import { COLORS } from "../constants/Colors";
import back from "../assets/icons/left-arrow.png";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const NoteDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const note = route.params

  return (
    <View style={styles.container}>
      <StatusBarComp style="light" background={COLORS.dark.background} />
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => navigation.replace("home")}
      >
        <Image source={back} resizeMode="contain" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.noteTitle}>{note.title}</Text>
      <Text style={styles.noteContent}>{note.content}</Text>
    </View>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark.background,
    flex: 1,
    paddingHorizontal: 16
  },

  noteTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: COLORS.dark.text,
  },

  noteContent: {
    fontSize: 16,
    color: COLORS.dark.placeholderText,
  },

  iconWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#EEEE",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
});
