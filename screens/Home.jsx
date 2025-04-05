import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { signOut, getAuth } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { COLORS } from "../constants/Colors";
import StatusBarComp from "../components/StatusBar";
import Header from "../components/home/Header";
import Notes from "../components/home/Notes";
import AddNote from "../components/home/AddNote";
import { collection, getDocs, orderBy, query} from "firebase/firestore";

const Home = () => {
  const [notes, setNotes] = useState([]);

  const Auth = getAuth();

  const fetchNotes = async () => {
    const user = Auth.currentUser;
    if (!user) {
      Alert.alert("Error", "Please sign in to access your notes.");
      return;
    }
    // fetch notes from Firestore
    try {
      const notesRef = collection(db, "users", user.uid, "notes");
      const q = query(notesRef, orderBy("createdAt", "desc"))
      const notesSnapShot = await getDocs(q);
      const notes = notesSnapShot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    // set notes state with the fetched data
      setNotes(notes);
    } catch (error) {
      Alert.error(error.message);
    }

  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBarComp style="light" background={COLORS.dark.background} />
      <Header />
      <Notes notes={notes} />
      <AddNote />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
    paddingHorizontal: 25,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
});

export default Home;
