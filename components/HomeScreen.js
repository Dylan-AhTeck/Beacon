import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { auth } from "./../firebase.js";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

import { StatusBar } from "expo-status-bar";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CircleButton from "./CircleButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import PersonMap from "./PersonMap";
import SearchScreen from "./SearchScreen";
import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";

const Home = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logging out");
        navigation.replace("Login");
      })
      .catch((error) => {});
  };

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

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: 6 });

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
          title: "Test",
          description: "Test",
        }),
      });
    })();
  }, []);

  const Tab = createBottomTabNavigator();

  return (
    /* <MapView
        style={{ width: "100%", height: "90%" }}
        initialRegion={mapState.region}
        onRegionChange={onRegionChange}
      >
        {mapState.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            image={require("./assets/nyc.png")}
          ></Marker>
        ))}
      </MapView> */
    <View style={styles.container}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#007AFF", // Find My app's blue color
          inactiveTintColor: "gray",
        }}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={PersonMap}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    width: "100%",
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
  forgotPassword: {
    color: "#007AFF",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  signUp: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});

export default Home;
