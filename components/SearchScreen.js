import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // You may need to install this package
import ProfileModal from "./ProfileModal";

const contactsData = [
  { id: 1, name: "John Doe", phone: "123-456-7890", location: "New York" },
  { id: 2, name: "Jane Smith", phone: "987-654-3210", location: "London" },
  { id: 3, name: "Aaron Jack", phone: "327-614-1230", location: "Mumbai" },
  { id: 4, name: "Dylan Ah Teck", phone: "123-456-7890", location: "New York" },
  {
    id: 5,
    name: "Emily Johnson",
    phone: "456-789-0123",
    location: "Los Angeles",
  },
  { id: 6, name: "Michael Brown", phone: "987-654-3210", location: "Chicago" },
  { id: 7, name: "Sophia Lee", phone: "345-678-9012", location: "Houston" },
  {
    id: 8,
    name: "Matthew Rodriguez",
    phone: "789-012-3456",
    location: "Phoenix",
  },
  {
    id: 9,
    name: "Olivia Martinez",
    phone: "567-890-1234",
    location: "Philadelphia",
  },
  {
    id: 10,
    name: "Daniel Wilson",
    phone: "123-456-7890",
    location: "San Antonio",
  },
  {
    id: 11,
    name: "Ava Anderson",
    phone: "321-654-9870",
    location: "San Diego",
  },
  { id: 12, name: "Ethan Taylor", phone: "654-987-0123", location: "Dallas" },
  {
    id: 13,
    name: "Isabella Thomas",
    phone: "789-012-3456",
    location: "San Jose",
  },
  { id: 14, name: "Mia Hernandez", phone: "234-567-8901", location: "Austin" },
  {
    id: 15,
    name: "Alexander Walker",
    phone: "876-543-2109",
    location: "Jacksonville",
  },
  {
    id: 16,
    name: "Charlotte Lopez",
    phone: "678-901-2345",
    location: "Fort Worth",
  },
  { id: 17, name: "James Hill", phone: "890-123-4567", location: "Columbus" },
  {
    id: 18,
    name: "Amelia Green",
    phone: "432-109-8765",
    location: "San Francisco",
  },
  {
    id: 19,
    name: "Benjamin King",
    phone: "210-987-6543",
    location: "Indianapolis",
  },
  // Add more contacts as needed
];

const SearchScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const groupContactsByLocation = () => {
    const groupedContacts = {};
    contactsData.sort((a, b) => a.location.localeCompare(b.location));
    contactsData.forEach((contact) => {
      if (!groupedContacts[contact.location]) {
        groupedContacts[contact.location] = [];
      }
      groupedContacts[contact.location].push(contact);
    });
    return groupedContacts;
  };

  const groupedContacts = groupContactsByLocation();

  return (
    <View style={styles.container}>
      {/* {isModalVisible ?? <View style={styles.overlay}></View>} */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
            <Ionicons name="add-circle" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
        />
      </View>

      <FlatList
        data={Object.entries(groupedContacts)}
        renderItem={({ item }) => (
          <>
            <Text style={styles.locationHeader}>{item[0]}</Text>

            {item[1].map((contact) => (
              <View style={styles.contactItem} key={contact.id}>
                <Text>{contact.name}</Text>
                <Text>{contact.phone}</Text>
              </View>
            ))}
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ProfileModal
        visible={isModalVisible}
        toggleModal={toggleModal}
      ></ProfileModal>
      {/* <NavigationContainer>
        <ProfileModal
          visible={isModalVisible}
          toggleModal={toggleModal}i
        ></ProfileModal>
        <Stack.Navigator>
          <Stack.Screen name="ProfileModal" component={ProfileModal} />
          <Stack.Screen
            name="AddUserProfile"
            component={AddUserProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer> */}

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View
          style={styles.modalContainer}
          {...panResponder.panHandlers} // Apply panResponder to the modal container
        >
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search profiles..."
              // value={searchQuery}
              // onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
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
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  addButton: {
    marginRight: 10,
  },
  contactItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  locationHeader: {
    paddingHorizontal: 20,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: "#f0f0f0",
  },
  modalContainer: {
    marginTop: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the opacity as needed
    zIndex: 0, // Ensure the overlay appears above other content
    elevation: 5, // Add elevation for shadow on Android
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    color: "blue",
    marginLeft: 10,
  },

  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default SearchScreen;
