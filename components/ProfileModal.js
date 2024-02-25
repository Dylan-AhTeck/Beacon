// ProfileModal.js
import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  PanResponder,
  Button,
  Pressable,
  Image,
} from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const profilesData = [
  { id: 1, name: "John Doe", username: "@johndoe" },
  { id: 2, name: "Jane Smith", username: "@janesmith" },
  { id: 3, name: "Alice Johnson", username: "@alicejohnson" },
  // Add more profiles as needed
];

const ProfilePage = ({ route, navigation }) => {
  const { profile } = route.params;

  const handleAddFriend = () => {
    // Logic for adding friend
  };

  return (
    <View style={styles.profileModalContent}>
      <View style={{ width: "100%" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            style={styles.backButton}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <Image
          source={require("../assets/profile-pic.png")}
          style={styles.profilePicture}
        />
        <Text style={styles.firstName}>{profile.name}</Text>
        <Text>{profile.username}</Text>
        <View style={styles.divider} />
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileInfoButton}>
            <Text style={styles.profileInfoText}>New York</Text>
          </View>
          <View style={styles.profileInfoButton}>
            <Text style={styles.profileInfoText}>+1 347 420 0005</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            borderColor: "#d6d6d6",
            borderWidth: 0.5,
            borderRadius: 5,
            marginVertical: 30,
          }}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
          <Ionicons name="person-add" size={24} color="white" />
          <Text style={styles.addButtonText}>Add Friend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfileModal = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Test"
    >
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
    </Stack.Navigator>
  );
};

const Test = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState(profilesData);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = profilesData.filter(
      (profile) =>
        profile.name.toLowerCase().includes(text.toLowerCase()) ||
        profile.username.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProfiles(filtered);
  };

  const navigateToProfilePage = (item) => {
    navigation.navigate("ProfilePage", {
      profile: item,
    });
  };

  const renderProfile = ({ item }) => (
    <TouchableOpacity
      style={styles.profileItem}
      onPress={() => navigateToProfilePage(item)}
    >
      <Text style={styles.profileName}>{item.name}</Text>
      <Text style={styles.profileUsername}>{item.username}</Text>
    </TouchableOpacity>
  );

  const dismissModal = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add contact</Text>
        <Pressable onPress={dismissModal}>
          <Text style={styles.closeButton}>Close</Text>
        </Pressable>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Name, @username"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredProfiles}
        renderItem={renderProfile}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  profileModalContainer: {
    backgroundColor: "#fff",
  },
  profileModalContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    flexDirection: "column", // Set flexDirection to row
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 16,
    color: "#007AFF",
  },
  backButton: {
    fontSize: 24,
    color: "#007AFF",
    marginLeft: 5,
  },
  profile: {
    alignItems: "center",
    flex: 1, // Take up remaining space
  },
  searchBar: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75, // Half of width and height to make it circular
    marginBottom: 10,
  },
  firstName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  profileItem: {
    marginBottom: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileUsername: {
    color: "#666",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    textAlign: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
  profileInfoContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  profileInfoButton: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    alignSelf: "center", // Center horizontally
    marginTop: 10,
    borderColor: "#d6d6d6",
    borderWidth: 1,
  },
  profileInfoText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#007AFF",
  },
  divider: {
    width: "100%",
    borderColor: "#d6d6d6",
    borderWidth: 0.5,
    borderRadius: 5,
    marginVertical: 30,
  },
});
