import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CoronaData from "./CoronaData";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CoronaData />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
