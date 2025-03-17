import React from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/Colors";
import StatusBarComp from "../components/StatusBar";
import Header from "../components/home/Header";
import Notes from "../components/home/Notes";
import AddNote from "../components/home/AddNote";

const Home = ({ route }) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBarComp style="dark" background={COLORS.light.background} />
      <Header />
      <Notes />
      <AddNote />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
    paddingHorizontal: 25,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
});

export default Home;
