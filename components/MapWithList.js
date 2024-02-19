import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import MapView from "react-native-maps";

const MapWithList = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

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

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
    Animated.timing(animation, {
      toValue: isListVisible ? 0 : 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Adjust this value as per your requirement to control the list's slide-in position
  });

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {/* Your map component goes here */}
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
            ></Marker>
          ))}
        </MapView>
      </View>
      {isListVisible && (
        <Animated.View
          style={[styles.listContainer, { transform: [{ translateY }] }]}
        >
          {isListVisible && <Text>List View</Text>}
        </Animated.View>
      )}

      <TouchableOpacity style={styles.button} onPress={toggleListVisibility}>
        <Text>{isListVisible ? "Hide List" : "Show List"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
  },
  listContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 200, // Adjust width as per your requirement
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    elevation: 3,
    zIndex: 1,
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default MapWithList;
