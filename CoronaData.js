import React, { useState, useEffect } from "react";
import Axios from "axios";
import { View, Text } from "react-native";

const CoronaData = () => {
  const [data, setData] = useState(null);

  const key =
    "Nx5XJRcvFs1iv%2BFC1ZeuusD2fQraxVFa%2FuA5rRVyTtGRGGECViB8gw0y%2FbNLA9EtaS1Ad09BPnK28XMRtOXa3w%3D%3D";

  useEffect(() => {
    const get = async () => {
      try {
        const response = await Axios.get(
          `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${key}&pageNo=1&numOfRows=10&startCreateDt=20200908&endCreateDt=20200908`
        );

        console.log(response.data.response.body.items.item);
        setData(response.data.response.body.items.item);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    get();
  }, []);

  return (
    <View>
      <Text>확진자 수: {data.accDefRate}</Text>
      <Text>검사진행 수: {data.accExamCnt}</Text>
      <Text>격리해제 수</Text>
      <Text>사망자 수</Text>
    </View>
  );
};

export default CoronaData;
