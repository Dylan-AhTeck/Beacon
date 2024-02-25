import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CircleButton from "./components/CircleButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import PersonMap from "./components/PersonMap";
import SearchScreen from "./components/SearchScreen";
import LoginScreen from "./components/LoginScreen";
import Home from "./components/HomeScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Location from "expo-location";

const Stack = createNativeStackNavigator();

export default function App() {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            style={styles.container}
          />
          <Stack.Screen name="Home" component={Home} style={styles.container} />

          {/* <Tab.Navigator
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
            component={LoginScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator> */}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
