import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import StackScreens from "../routers/StackScreens";
import TabScreens from "../routers/TabScreens";

export default function AppContainer() {
  let token = useSelector((state) => state.login);

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        {token === false ? <StackScreens /> : <TabScreens />}
      </SafeAreaView>
    </NavigationContainer>
  );
}
