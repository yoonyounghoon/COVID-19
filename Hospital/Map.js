import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const Map = () => {
  return (
    <MapView
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};
export default Map;
