import Axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import PharmacyItem from "./PharmacyItem";
import { Button, Text } from "react-native-elements";
import Modal, { SlideAnimation, ModalContent } from "react-native-modals";
import { Divider } from "react-native-elements";

const PharmacyList = ({ xPos, yPos }) => {
  const [isData, setIsData] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const get = async () => {
      try {
        const response = await Axios.get(
          `http://192.168.0.10:8080/medicalHelper/pharmacy/gps/${yPos}/${xPos}?pageNo=${1}`
        );
        setData(response.data);
        setIsData(true);
      } catch (e) {
        console.log(e);
      }
    };
    get();
  }, [xPos, yPos]);

  return (
    <View>
      {isData === false ? (
        <Text>해당 지역 주위에 약국이 없습니다.</Text>
      ) : (
        data.map((data) => <PharmacyItem key={data.postNo} data={data} />)
      )}
    </View>
  );
};

export default PharmacyList;
