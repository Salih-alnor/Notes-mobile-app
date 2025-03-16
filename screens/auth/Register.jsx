import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";

import { COLORS } from "../../constants/Colors.ts"
import { auth, db } from "../../config/Firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import StatusBarComp from "../../components/StatusBar.jsx"

import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigation = useNavigation();

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)



  const handleSignUp = async (
    first_name,
    last_name,
    email,
    password,
  ) => {
    try {
      setIsLoading(true)
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        first_name: first_name,
        last_name: last_name,
        email: user.email,
        createdAt: new Date(),
      });
      setIsLoading(false)
      navigation.replace('login')
      console.log("User signed and data is saved in firestore");
    } catch (error) {
      setIsLoading(false)
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
   <StatusBarComp style="dark" background={COLORS.light.background}/>
      <Text style={{
        fontSize: 30,
        fontWeight: "bold",
        color: COLORS.light.text,
        marginBottom: 30,
      }}>Create an account</Text>
      <TextInput
        onChangeText={setFirst_name}
        style={styles.input}
        keyboardType="default"
        placeholder="first-name"
        placeholderTextColor={COLORS.light.placeholderText}
      />
      <TextInput
        onChangeText={setLast_name}
        style={styles.input}
        keyboardType="default"
        placeholder="last-name"
        placeholderTextColor={COLORS.light.placeholderText}
      />
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
        secureTextEntry={true}
        placeholderTextColor={COLORS.light.placeholderText}
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
          borderWidth: 1,
          marginTop: 60
        }}
        onPress={() =>
          handleSignUp(first_name, last_name, email, password)
        }
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
                   Sign Up
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
                    color: COLORS.GRAY,
                  }}
                >
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.replace("login")}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: COLORS.light.tabIconSelected,
                    }}
                  >
                    {"  "}
                    Login!
                  </Text>
                </TouchableOpacity>
              </View>
    </View>
  );
};

export default Register;

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
