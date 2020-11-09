import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Appointment from "../pages/Appointment";
import Confirm from "../pages/Confirm";
import Hospital from "../pages/Hospital";
import Pharmacy from "../pages/Pharmacy";
import Mypage from "../pages/Mypage";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Appointment") {
            iconName = focused ? "check" : "list";
          } else if (route.name === "Confirm") {
            iconName = focused ? "check" : "calendar-check";
          } else if (route.name === "Hospital") {
            iconName = focused ? "check" : "map-marker-alt";
          } else if (route.name === "Pharmacy") {
            iconName = focused ? "check" : "medkit";
          } else if (route.name === "Mypage") {
            iconName = focused ? "check" : "grin";
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Confirm" component={Confirm} />
      <Tab.Screen name="Hospital" component={Hospital} />
      <Tab.Screen name="Pharmacy" component={Pharmacy} />
      <Tab.Screen name="Mypage" component={Mypage} />
    </Tab.Navigator>
  );
}
