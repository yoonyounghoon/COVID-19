import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PharmacyScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Pharmacy</Text>
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

export default PharmacyScreen;
