import {
  StyleSheet,
  Text,
  View,

  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../constants/Colors.ts";
import { auth, db } from "../../config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      const userDoc = doc(db, "users", user.uid);
      const userInfo = await getDoc(userDoc);
      if (userInfo.exists()) {
        const user = userInfo.data()
        navigation.replace("home", {
          user
        });
      } else {
        console.log("no data in db");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={{
              fontSize: 30,
              fontWeight: "bold",
              color: COLORS.light.text,
              marginBottom: 30,
            }}>Login</Text>
      <TextInput
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor={COLORS.light.placeholderText}
      />
      <TextInput
        onChangeText={setPassword}
        style={styles.input}
        keyboardType="default"
        placeholder="Password"
        placeholderTextColor={COLORS.light.placeholderText}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={{
          width: "90%",
          height: 60,
          backgroundColor: COLORS.dark.background,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginBottom: 10,
          marginTop: 60,
        }}
        onPress={handleLogin}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: COLORS.GRAY,
            }}
          >
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.replace("register")}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: COLORS.light.tabIconSelected,
              }}
            >
              {"  "}
              Sign Up!
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.light.background,
  },

  input: {
    width: "90%",
    height: 60,
    backgroundColor: COLORS.light.inputBackground,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    fontSize: 18,
  },
});
