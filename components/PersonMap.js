import BottomSheet from "@gorhom/bottom-sheet";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Location from "expo-location";

export default function PersonMap() {
  const [mapState, setMapState] = useState({
    region: {
      latitude: 0,
      longitude: 0,
    },
    markers: [],
  });

  const onRegionChange = (region) => {
    setMapState({ region, markers: mapState.markers });
  };

  const [isVisible, setIsVisible] = useState(false);

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["7%", "25%", "50%", "70%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: 6,
        });

        setMapState({
          region: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          markers: mapState.markers.concat({
            latlng: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            title: "See beacon",
            description: "Test",
          }),
        });
      } catch (err) {}
    })();
  }, []);

  const locations = [
    { id: "1", name: "Jennifer", address: "123 Main St" },
    { id: "2", name: "Melanie", address: "456 Elm St" },
    { id: "3", name: "Astor", address: "789 Oak St" },
    // Add more locations as needed
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  const [listData, setListData] = useState([]);

  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={mapState.region}
        onRegionChange={onRegionChange}
      >
        {mapState.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            image={require("../assets/statue-of-liberty.png")}
          >
            {/* <Callout style={styles.callout}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>New York!</Text>
                <Text>42 contacts</Text>
                <Button
                  title="Press Me"
                  onPress={() => console.log("Button pressed")}
                />
              </View>
            </Callout> */}
          </Marker>
        ))}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View>
          <View style={styles.listHeaderContainer}>
            <Text style={styles.listHeaderLeft}>People</Text>
            <Text style={styles.listHeaderRight}>12 Contacts</Text>
          </View>

          <FlatList
            data={locations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
    width: "300px",
  },
  list: {
    maxHeight: 200,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  callout: {
    width: 150,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  calloutText: {
    marginBottom: 5,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  listContainer: {
    paddingVertical: 16,
  },
  item: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  listHeaderLeft: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 0,
    paddingLeft: 10,
  },
  listHeaderRight: {
    fontSize: 10,
    fontWeight: "bold",
    paddingRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "#666",
  },
  listHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    width: "100%", // Adjust width as needed
  },
});
