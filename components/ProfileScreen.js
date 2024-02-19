import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import ProfileModal from ".//ProfileModal";

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logging out");
        navigation.replace("Login");
      })
      .catch((error) => {});
  };

  return (
    <View style={style.container}>
      <Text>Hello</Text>
      <Text>WHere you</Text>
      <Button onPress={handleLogout} title="Logout"></Button>
    </View>
  );
};

export default ProfileScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
