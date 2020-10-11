import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PharmacyInfo from "./PharmacyInfo";
import * as Location from "expo-location";

// 여기서 현재위치를 받아서
const PharmacyScreen = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    const getLocation = async () => {
      try {
        await Location.requestPermissionsAsync();

        const location = await Location.getCurrentPositionAsync();

        setLat(location.coords.latitude);
        setLon(location.coords.longitude);
        console.log("----PHARMACYSCREEN");
        console.log(lat);
        console.log(lon);
      } catch (e) {
        console.log(e);
      }
    };
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <PharmacyInfo styles={styles.info} lat={lat} lon={lon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
  info: {
    flex: 1,
    backgroundColor: "yellow",
  },
});
export default PharmacyScreen;
