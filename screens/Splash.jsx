import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import StatusBarComp from "../components/StatusBar";
import { COLORS } from "../constants/Colors";
import { ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../config/Firebase";
import { doc, getDoc } from "firebase/firestore";

const Splash = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const user = userDoc.data();
          navigation.replace("home", {
            user,
          });
        } else {
          console.log("No user document found.");
          navigation.navigate("register");
        }
      } else {
        navigation.replace("login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBarComp style="light" background={COLORS.dark.background} />
      <Image
        source={logo}
        resizeMode="contain"
        style={{
          width: 300,
          height: 300,
        }}
      />

      <View>
        {loading ? (
          <View
            style={{
              height: 50,
            }}
          >
            <ActivityIndicator
              size="large"
              color={COLORS.dark.tabIconSelected}
            />
          </View>
        ) : (
          <View
            style={{
              height: 50,
            }}
          ></View>
        )}
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
