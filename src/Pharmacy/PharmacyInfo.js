import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Axios from "axios";

const PharmacyInfo = ({ lat }, { lon }) => {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    const get = async () => {
      try {
        const response = await Axios.get(
          `http://192.168.0.10:8080/medicalHelper/pharmacy/gps/${lat}/${lon}?pageNo=${1}`
        );
        setData(response.data.body.items);
        console.log("PHARMACYINFO");
        console.log(lat);
        console.log(lon);
        cosole.log(data);
      } catch (e) {
        console.log(e);
        console.log("병원데이터 못가져옴!");
      }
    };
    get();
  }, []);
  return (
    <View>
      <Text>
        {lat}
        {lon}
      </Text>
    </View>
  );
};

export default PharmacyInfo;
