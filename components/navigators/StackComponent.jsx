import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Splash from "../../screens/Splash";
import Login from "../../screens/auth/Login";
import Register from "../../screens/auth/Register";
import Home from "../../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackComponent = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};

export default StackComponent;

const styles = StyleSheet.create({});
