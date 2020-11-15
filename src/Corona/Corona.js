import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import Head from "../components/Head";
import Axios from "axios";
import { Button, Text } from "react-native-elements";
import Chart from "./Chart";
import NewsList from "./NewsList";

const key =
  "OW%2B7pApxaWyA%2FMtp4h809DV8bN%2FTeDY%2B6RVsTr5ZsS4Peuz2gAmUOTBpsqyZc0ITRd%2FIyE5qor%2B2cCxo42moPQ%3D%3D";
const today = new Date();
const year = today.getFullYear();
let month =
  today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
const day = today.getDate();
const day2 = day - 5;

export default function Corona() {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [visible, setVisble] = useState(false);
  const [visible2, setVisble2] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get(
          `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${key}&pageNo=1&numOfRows=10&startCreateDt=${year}${month}${day2}&endCreateDt=${year}${month}${day}`
        );
        const response2 = await Axios.get(
          `http://apis.data.go.kr/1262000/SafetyNewsList/getCountrySafetyNewsList?serviceKey=OW%2B7pApxaWyA%2FMtp4h809DV8bN%2FTeDY%2B6RVsTr5ZsS4Peuz2gAmUOTBpsqyZc0ITRd%2FIyE5qor%2B2cCxo42moPQ%3D%3D&numOfRows=10&pageNo=1&title1=%EC%9E%85%EA%B5%AD&title2=%EC%BD%94%EB%A1%9C%EB%82%98&title3=%EC%9A%B4%ED%95%AD&title4=%ED%95%AD%EA%B3%B5%EA%B6%8C&title5=%EA%B2%A9%EB%A6%AC`
        );
        console.log(response.data.response.body.items.item);
        setData(response.data.response.body.items.item);
        setData2(response2.data.response.body.items.item);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <Head />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "black",
          justifyContent: "center",
        }}
      >
        <Text h1 style={{ color: "white" }}>
          COVID-19
        </Text>
      </View>
      <Button
        title="누적 확진자 현황 조회"
        onPress={() => {
          setVisble(!visible);
        }}
      />
      <View>
        {visible ? <Chart data={data} /> : <Text>데이터를 조회해보세요 !</Text>}
      </View>
      <View>
        <Text></Text>
      </View>
      <Button
        title="코로나 관련 이슈 조회"
        onPress={() => {
          setVisble2(!visible2);
        }}
        buttonStyle={{ backgroundColor: "#ff6f69" }}
      />
      <ScrollView>
        {visible2 ? (
          <NewsList data2={data2} />
        ) : (
          <Text>데이터를 조회해보세요 !</Text>
        )}
      </ScrollView>
    </View>
  );
}
