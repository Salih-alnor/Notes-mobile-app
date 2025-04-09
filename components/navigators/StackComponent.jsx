import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Splash from "../../screens/Splash";
import Login from "../../screens/auth/Login";
import Register from "../../screens/auth/Register";
import Home from "../../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import AddNote from "../../screens/AddNote";
import Info from "../../screens/Info";
import NoteDetails from "../../screens/NoteDetails";

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
      <Stack.Screen name="add-note" component={AddNote} />
      <Stack.Screen name="info" component={Info} />
      <Stack.Screen name="note-details" component={NoteDetails} />
    </Stack.Navigator>
  );
};

export default StackComponent;

const styles = StyleSheet.create({});
