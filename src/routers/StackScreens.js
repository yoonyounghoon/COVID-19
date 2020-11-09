import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../login/Login";
import SignUp from "../login/SignUp";

const Stack = createStackNavigator();

const StackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default StackScreens;
