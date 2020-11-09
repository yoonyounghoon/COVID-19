import Axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Map from "./Map";

const HospitalInfo = ({ lat, lon }) => {
  const [data, setData] = useState(null);
  const xPos = lat;
  const yPos = lon;
  useEffect(() => {
    const get = async () => {
      try {
        const response = await Axios.get(
          `http://192.168.0.10:8080/medicalHelper/pharmacy/gps/${yPos}/${xPos}?pageNo=${1}`
        );

        console.log("HOSPITALINFO");
        setData(response.data);
      } catch (e) {
        console.log(e);
        console.log("병원데이터 못가져옴!");
      }
    };
    get();
  }, []);
  return (
    <View>
      <Map xPos={xPos} yPos={yPos} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
});

export default HospitalInfo;
