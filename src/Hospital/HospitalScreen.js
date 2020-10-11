import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Map from "./Map";
import * as Location from "expo-location";
import HospitalInfo from "./HospitalInfo";
import PharmacyInfo from "../Pharmacy/PharmacyInfo";

const HospitalScreen = () => {
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
      <HospitalInfo styles={styles.info} lat={lat} lon={lon} />
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
export default HospitalScreen;
