import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text>{item.title}</Text>
      {/* Add more content as needed */}
    </TouchableOpacity>
  );

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
            // description={marker.description}
            image={require("../assets/statue-of-liberty.png")}
            onPress={() => setIsVisible(true)}
          ></Marker>
        ))}
      </MapView>
      {isVisible && (
        <FlatList
          data={[1, 2, 3]}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          style={styles.list}
        />
      )}
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
});
