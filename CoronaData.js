import React, { useState, useEffect } from "react";
import Axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import Chart from "./Chart";

const CoronaData = () => {
  const [data, setData] = useState(null);

  const today = new Date();
  const year = today.getFullYear();
  let month =
    today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const day = today.getDate();

  const key =
    "Nx5XJRcvFs1iv%2BFC1ZeuusD2fQraxVFa%2FuA5rRVyTtGRGGECViB8gw0y%2FbNLA9EtaS1Ad09BPnK28XMRtOXa3w%3D%3D";

  useEffect(() => {
    const get = async () => {
      try {
        const response = await Axios.get(
          `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${key}&pageNo=1&numOfRows=10&startCreateDt=${year}${month}${day}&endCreateDt=${year}${month}${day}`
        );
        setData(response.data.response.body.items.item);
      } catch (e) {
        console.log("catch로 빠짐");
      }
    };

    get();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.headerText}>코로나 19 현황</Text>
      </View>
      <View style={styles.chart}>
        <Chart data={data} />
      </View>
      <View style={styles.content}>
        {/* <Text style={styles.text}>
          총 확진자 수: {data.decideCnt.toLocaleString()}명
        </Text>
        <Text style={styles.text}>
          검사진행 수: {data.examCnt.toLocaleString()}명
        </Text>
        <Text style={styles.text}>
          격리해제 수: {data.clearCnt.toLocaleString()}명
        </Text>
        <Text style={styles.text}>
          사망자 수: {data.deathCnt.toLocaleString()}명
        </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    color: "white",
  },
  title: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    flex: 2,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1.5,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 25,
  },
});

export default CoronaData;
