import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/Colors";
import StatusBarComp from "../components/StatusBar";
import back from "../assets/icons/left-arrow.png";
import edit from "../assets/icons/edit-text.png";
import save from "../assets/icons/save.png";
import { useNavigation } from "@react-navigation/native";

const AddNote = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBarComp style="dark" background={COLORS.light.background} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.replace("home")}
        >
          <Image source={back} resizeMode="contain" style={styles.icon} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <TouchableOpacity style={styles.iconWrapper}>
            <Image source={edit} resizeMode="contain" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconWrapper, { marginLeft: 10 }]}>
            <Image source={save} resizeMode="contain" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        placeholder="Note Title"
        keyboardType="default"
        style={[
          styles.input,
          {
            borderBottomColor: "#DDD",
            borderBottomWidth: 1,
          },
        ]}
        multiline={true}
        autoFocus={true}
      />

      <TextInput
        placeholder="Note SubTitle"
        keyboardType="default"
        style={styles.input}
        multiline={true}
      />
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
    paddingHorizontal: 25,
  },

  input: {
    minHeight: 150,
    fontSize: 25,
  },

  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },

  iconWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#EEEE",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
