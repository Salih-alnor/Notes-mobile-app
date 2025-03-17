import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import Note from "./Note";

const Notes = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
    </ScrollView>
  );
};

export default Notes;

const styles = StyleSheet.create({});
