import Axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import EmergencyItem from "./EmergencyItem";

const EmergencyList = ({ data }) => {
  const [isData, setisData] = useState(false);
  const [datas, setdatas] = useState();

  useEffect(() => {
    setdatas(data);
    setisData(true);
  }, [data]);
  return (
    <View>
      {isData === false ? (
        <Text>해당 지역 주위에 응급실이 없습니다.</Text>
      ) : (
        datas.map((data) => <EmergencyItem data={data} />)
      )}
    </View>
  );
};
export default EmergencyList;
