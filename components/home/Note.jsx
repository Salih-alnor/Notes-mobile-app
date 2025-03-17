import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

const Note = () => {
  const [color, setColor] = useState(null);

  const getRandomColor = () => {
    // Generating random RGB values
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Returning the RGB color string
    return `rgb(${red}, ${green}, ${blue})`;
  };

  useEffect(() => {
    setColor(getRandomColor());
  }, []);
  return (
    <TouchableOpacity
      style={[
        styles.noteContainer,
        {
          backgroundColor: color,
        },
      ]}
    >
      <Text style={styles.noteTitle}>
        Book Review : The Design of Everyday Things by Don Norman
      </Text>
    </TouchableOpacity>
  );
};

export default Note;

const styles = StyleSheet.create({
  noteContainer: {
    padding: 20,
    marginBottom: 25,
    borderRadius: 15,
    minHeight: 60,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 2,
  },

  noteTitle: {
    fontSize: 25,
    fontWeight: "400",
    color: "#222",
  },
});
