import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import Head from "../components/Head";
import PharmacyList from "./PharmacyList";
import PharmacyMap from "./PharmacyMap";

export default function Pharmacy() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    const getLocation = async () => {
      try {
        await Location.requestPermissionsAsync();
        const location = await Location.getCurrentPositionAsync();

        setLat(location.coords.latitude);
        setLon(location.coords.longitude);
      } catch (e) {
        console.log(e);
      }
    };
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Head />

      <PharmacyMap style={styles.map} xPos={lat} yPos={lon} />
      <ScrollView style={styles.list}>
        <PharmacyList xPos={lat} yPos={lon} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  map: {
    flex: 4,
  },
  list: { flex: 1, backgroundColor: "#b2d8d8" },
});
