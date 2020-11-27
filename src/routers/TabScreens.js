import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Mypage from "../pages/Mypage";
import { FontAwesome5 } from "@expo/vector-icons";
import PharmacyScreen from "../pages/PharmacyScreen";
import MedicalCheckScreen from "../pages/MedicalCheckScreen";
import ConfirmScreen from "../pages/ConfirmScreen";
import CoronaScreen from "../pages/CoronaScreen";
import EmergencyScreen from "../pages/EmergencyScreen";

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
          } else if (route.name === "EmergencyRoom") {
            iconName = focused ? "check" : "map-marker-alt";
          } else if (route.name === "Pharmacy") {
            iconName = focused ? "check" : "medkit";
          } else if (route.name === "Mypage") {
            iconName = focused ? "check" : "grin";
          } else if (route.name === "COVID-19") {
            iconName = focused ? "check" : "chart-line";
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="COVID-19" component={CoronaScreen} />
      <Tab.Screen name="EmergencyRoom" component={EmergencyScreen} />
      <Tab.Screen name="Appointment" component={MedicalCheckScreen} />
      <Tab.Screen name="Confirm" component={ConfirmScreen} />
      <Tab.Screen name="Pharmacy" component={PharmacyScreen} />
      <Tab.Screen name="Mypage" component={Mypage} />
    </Tab.Navigator>
  );
}
