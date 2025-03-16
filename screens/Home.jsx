import React from "react";
import { View, Text,Alert, StyleSheet, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/Colors";

const Home = ({route}) => {
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
      <StatusBar style="dark" hidden={false}/>
      <Text style={styles.text}>Home page</Text>
      <Text style={styles.text}>{route.params.user.first_name}</Text>
      <Text style={styles.text}>{route.params.user.last_name}</Text>
      <Text style={styles.text}>{route.params.user.email}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.light.background
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
   
  }
});

export default Home;
