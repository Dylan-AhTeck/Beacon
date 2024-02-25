import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import ProfileModal from ".//ProfileModal";

const AddUserProfileScreen = ({ navigation }) => {
  return (
    <View style={style.container}>
      <Text>Hello</Text>
      <Text>WHere you</Text>
      <Button onPress={handleLogout} title="Logout"></Button>
    </View>
  );
};

export default AddUserProfileScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
