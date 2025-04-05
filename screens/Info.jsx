import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import StatusBarComp from "../components/StatusBar";
import { COLORS } from "../constants/Colors";
import { signOut } from "firebase/auth";
import { useNavigation } from "expo-router";
import { auth } from "../config/Firebase";

const Info = () => {
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
      <StatusBarComp style={"light"} background={COLORS.dark.background} />
      <TouchableOpacity onPress={() => handleLogout()}>
        <Text
          style={{
            color: COLORS.dark.text,
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>

      <Button title="Back" onPress={() => navigation.replace('home')}/>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
