import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Medical_Check_Item from "./Medical_Check_Item";

const Medical_CheckList = ({ data }) => {
  const [isData, setisData] = useState(false);
  const [datas, setdatas] = useState();

  useEffect(() => {
    setdatas(data);
    setisData(true);
  }, [data]);
  return (
    <View>
      {isData === false ? (
        <Text>해당 지역 주위에 병원이 없습니다.</Text>
      ) : (
        datas.map((data) => <Medical_Check_Item data={data} />)
      )}
    </View>
  );
};

export default Medical_CheckList;
