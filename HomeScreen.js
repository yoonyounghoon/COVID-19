import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Chart from "./Chart";
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
  },
});

export default HomeScreen;
