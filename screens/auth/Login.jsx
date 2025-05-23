import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../constants/Colors.ts";
import { auth, db } from "../../config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import StatusBarComp from "../../components/StatusBar.jsx";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      const userDoc = doc(db, "users", user.uid);
      const userInfo = await getDoc(userDoc);
      if (userInfo.exists()) {
        setIsLoading(false);
        const user = userInfo.data();
        navigation.replace("home", {
          user,
        });
        
      } else {
        console.log("no data in db");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBarComp style="light" background={COLORS.dark.background} />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: COLORS.dark.text,
          marginBottom: 30,
        }}
      >
        Login
      </Text>
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
          backgroundColor: COLORS.light.tabIconSelected,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginBottom: 10,
          marginTop: 60,
        }}
        onPress={handleLogin}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={COLORS.dark.text}
            animating={isLoading}
          />
        ) : (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Login
          </Text>
        )}
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
            color: COLORS.dark.text,
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
    backgroundColor: COLORS.dark.background,
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
