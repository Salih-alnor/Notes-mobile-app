import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { deleteDoc, doc, collection } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import { useNavigation } from "expo-router";

const Note = ({ note }) => {

  const navigation = useNavigation();
  const [color, setColor] = useState(null);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

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

  const deleteNote = async (note) => {
    const noteId = note.id;
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "Please sign in to delete your note.");
      return;
    }
  
    try {
      const noteRef = doc(db, "users", user.uid, "notes", noteId);
      await deleteDoc(noteRef);
      Alert.alert("Note deleted successfully!");


    } catch (error) {
      console.log("Error deleting note:", error.message);
    }
    setShowDeleteIcon(false)
  };

  return (
    <TouchableOpacity
    onPress={() => navigation.replace('note-details', {
      noteid : note.id,
      title: note.title,
      content: note.subTitle
    })}
      onLongPress={() => setShowDeleteIcon(true)}
      style={[
        styles.noteContainer,
        {
          backgroundColor: color,
        },
      ]}
    >
      <Text style={styles.noteTitle}>{note.title}</Text>
      {showDeleteIcon && (
        <TouchableOpacity
          style={styles.deleteIconContainer}
          onPress={() => deleteNote(note)}
        >
          <Text style={styles.deleteIcon}>Delete</Text>
        </TouchableOpacity>
      )}
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

  deleteIconContainer: {
    backgroundColor: "#FFF",
    width: "100",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 16,
    marginTop: 20
  },
  deleteIcon: {
    fontSize: 18,
    color: "red",

  }
});
