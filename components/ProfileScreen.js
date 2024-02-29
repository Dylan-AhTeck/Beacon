import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Switch,
  TextInput,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

// Call this Me
const ProfileScreen = ({ navigation }) => {
  const [location, setLocation] = useState("New York");
  const [from, setFrom] = useState("");
  const [shareLocation, setShareLocation] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logging out");
        navigation.replace("Login");
      })
      .catch((error) => {});
  };

  const handleEdit = (field) => {
    setEditingField(field);
    setNewValue(
      field === "Name" ? name : field === "Username" ? username : phone
    );
  };

  const handleSave = () => {
    // Save the new value based on the edited field
    switch (editingField) {
      case "Name":
        setName(newValue);
        break;
      case "Username":
        setUsername(newValue);
        break;
      case "Phone":
        setPhone(newValue);
        break;
      default:
        break;
    }
    setEditingField(null); // Reset editing field
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Me</Text>
      </View>

      <SafeAreaView style={styles.content}>
        <ScrollView>
          <View
            style={{
              padding: 25,
              margin: 20,
              borderRadius: 10,
              backgroundColor: "#FFFFFF",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#007AFF",
                borderRadius: 50,
              }}
            >
              <Ionicons name="navigate" size={20} color="white" fill />
            </View>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, marginVertical: 15 }}
            >
              My Location
            </Text>
            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.category}>Beacon</Text>
              <Text style={styles.input}>New York</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.category}>Default Phone</Text>
              <TextInput
                style={styles.input}
                value={from}
                onChangeText={setFrom}
                placeholder="Enter from"
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.category}>Share My Location</Text>
              <Switch value={shareLocation} onValueChange={setShareLocation} />
            </View>
          </View>
          <View
            style={{
              padding: 25,
              marginHorizontal: 20,
              borderRadius: 10,
              backgroundColor: "#FFF",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF3B30",
                borderRadius: 50,
              }}
            >
              <Ionicons name="list-circle" size={20} color="white" fill />
            </View>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, marginVertical: 15 }}
            >
              Personal Information
            </Text>
            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.category}>Permanent Phone</Text>
              <Text style={styles.input}>+1 347 420 0005</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.category}>Email</Text>
              <TextInput
                style={styles.input}
                value={from}
                onChangeText={setFrom}
                placeholder="Enter from"
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.category}>Share My Phone Number</Text>
              <Switch value={shareLocation} onValueChange={setShareLocation} />
            </View>
            <View style={styles.divider} />

            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    paddingVertical: 10,
    flex: 1,
  },
  edit: {
    color: "blue",
  },
  subheader: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationText: {
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  category: {
    flex: 1,
    fontSize: 16,
  },
  divider: {
    width: "100%",
    borderColor: "#d6d6d6",
    borderWidth: 0.5,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    color: "#999",
    fontSize: 17,
  },
  signOutText: {
    color: "#007AFF", // Blue color
    fontSize: 12,
    textDecorationLine: "underline", // Add underline to indicate it's clickable
  },
});

export default ProfileScreen;
