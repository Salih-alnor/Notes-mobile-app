import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/Colors";
import StatusBarComp from "../components/StatusBar";
import back from "../assets/icons/left-arrow.png";
import edit from "../assets/icons/edit-text.png";
import save from "../assets/icons/save.png";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { collection, setDoc, doc } from "firebase/firestore";

const AddNote = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const authUser = getAuth();

  const saveNote = async (title, subTitle) => {
    const user = authUser.currentUser;
    if (!user) {
      Alert.alert("Error", "Please sign in to save your note.");
      return;
    }

    if (!title || !subTitle || title.length === 0 || subTitle.length === 0) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const noteRef = doc(collection(db, "users", user.uid, "notes"));

      await setDoc(noteRef, {
        title,
        subTitle,
        createdAt: new Date(),
      });
      console.log("Note added successfully!");
    } catch (error) {
      console.log(error.message);
      return;
    }

    // Save note to Firestore

    navigation.replace("home");
  };

  return (
    <View style={styles.container}>
      <StatusBarComp style="light" background={COLORS.dark.background} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.replace("home")}
        >
          <Image source={back} resizeMode="contain" style={styles.icon} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <TouchableOpacity style={styles.iconWrapper}>
            <Image source={edit} resizeMode="contain" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconWrapper, { marginLeft: 10 }]}
            onPress={() => saveNote(title, subTitle)}
          >
            <Image source={save} resizeMode="contain" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        placeholder="Note Title"
        keyboardType="default"
        style={[
          styles.input,
          {
            borderBottomColor: "#DDD",
            borderBottomWidth: 1,
          },
        ]}
        multiline={true}
        autoFocus={true}
        onChangeText={(value) => setTitle(value)}
        placeholderTextColor={COLORS.dark.placeholderText}
      />

      <TextInput
        placeholder="Note SubTitle"
        keyboardType="default"
        style={styles.input}
        multiline={true}
        onChangeText={(value) => setSubTitle(value)}
        placeholderTextColor={COLORS.dark.placeholderText}
      />
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
    paddingHorizontal: 16,
  },

  input: {
    minHeight: 150,
    fontSize: 25,
    color: COLORS.dark.text
  },

  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
