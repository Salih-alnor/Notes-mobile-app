import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import search from "../../assets/icons/search.png";
import info from "../../assets/icons/info.png";
import { COLORS } from "../../constants/Colors";
import { useNavigation } from "expo-router";

const Header = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 40,
            color: COLORS.dark.text,
          }}
        >
          Notes
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconWrapper}>
          <Image source={search} resizeMode="contain" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.replace('info')}>
          <Image source={info} resizeMode="contain" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    marginLeft: 20,
  },
});
