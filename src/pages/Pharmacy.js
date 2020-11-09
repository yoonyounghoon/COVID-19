import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import Map from "../Hospital/Map";
import Axios from "axios";
import Head from "../components/Head";
import PharmacyItem from "./PharmacyItem";

export default function Pharmacy() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        await Location.requestPermissionsAsync();
        const location = await Location.getCurrentPositionAsync();

        setLat(location.coords.latitude);
        setLon(location.coords.longitude);

        const response = await Axios.get(
          `http://192.168.0.10:8080/medicalHelper/pharmacy/gps/${lon}/${lat}?pageNo=${1}`
        );
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getLocation();
  }, []);
  return (
    <View style={styles.container}>
      <Head />
      <Map style={styles.map} xPos={lat} yPos={lon} data={data} />
      <View style={styles.list}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: { flex: 1, backgroundColor: "yellow" },
});
