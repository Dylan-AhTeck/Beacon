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
} from "react-native";

const profilesData = [
  { id: 1, name: "John Doe", username: "@johndoe" },
  { id: 2, name: "Jane Smith", username: "@janesmith" },
  { id: 3, name: "Alice Johnson", username: "@alicejohnson" },
  // Add more profiles as needed
];

const ProfileModal = ({ visible, toggleModal }) => {
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

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (e, gestureState) => {
      // Dismiss the modal if dragged down by more than 100 pixels
      if (gestureState.dy > 100) {
        toggleModal();
      }
    },
  });

  const renderProfile = ({ item }) => (
    <TouchableOpacity
      style={styles.profileItem}
      onPress={() => navigateToProfile(item)}
    >
      <Text style={styles.profileName}>{item.name}</Text>
      <Text style={styles.profileUsername}>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={styles.modalContainer}
        {...panResponder.panHandlers} // Apply panResponder to the modal container
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add contact</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
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
      </View>
    </Modal>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 50,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
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
  searchBar: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
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
});
