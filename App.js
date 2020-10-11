import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import HospitalScreen from "./src/Hospital/HospitalScreen";
import PharmacyScreen from "./src/Pharmacy/PharmacyScreen";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "check" : "home";
            } else if (route.name === "Hospital") {
              iconName = focused ? "check" : "hospital";
            } else if (route.name === "Pharmacy") {
              iconName = focused ? "check" : "medkit";
            }

            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Hospital" component={HospitalScreen} />
        <Tab.Screen name="Pharmacy" component={PharmacyScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
