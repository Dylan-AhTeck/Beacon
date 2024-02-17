import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";

const contactsData = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Bob Johnson" },
  // Add more contact data as needed
];

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contactsData);

  const updateSearch = (text) => {
    setSearch(text);
    const filteredData = contactsData.filter((contact) =>
      contact.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filteredData);
  };

  const renderItem = ({ item }) => (
    <ListItem key={item.id} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#F7F5F6", // Background color similar to Find My app
  },
  searchBarContainer: {
    backgroundColor: "#007AFF", // Find My app's blue color
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchBarInputContainer: {
    backgroundColor: "white",
  },
});

export default SearchScreen;
