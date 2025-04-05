import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import Note from "./Note";
import logo from "../../assets/images/logo.png";

const Notes = ({ notes }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {notes.length > 0 ? (
        notes.map((note, index) => <Note key={index} note={note} />)
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 140
          }}
        >
          <Image
            style={{
              width: 300,
              height: 300,
            }}
            resizeMode="contain"
            source={logo}
          />

          <Text style={{
            marginTop: 20,
            fontSize: 24,
            fontWeight: "400",
            color: "#666",
          }}>Add your note</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Notes;

const styles = StyleSheet.create({});
