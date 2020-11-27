import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Head from "../components/Head";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Axios from "axios";

import { Button } from "react-native-elements";
import EmergencyItem from "./EmergencyItem";

const key =
  "OW%2B7pApxaWyA%2FMtp4h809DV8bN%2FTeDY%2B6RVsTr5ZsS4Peuz2gAmUOTBpsqyZc0ITRd%2FIyE5qor%2B2cCxo42moPQ%3D%3D";

const Emergency = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await Location.getCurrentPositionAsync();

        setLat(location.coords.latitude);
        setLon(location.coords.longitude);

        const response = await Axios.get(
          `http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytLcinfoInqire?Servicekey=${key}&WGS84_LON=${lon}&WGS84_LAT=${lat}&pageNo=1&numOfRows=10`
        );
        setData(response.data.response.body.items.item);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getLocation();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Head />
      <View style={{ flex: 1 }}>
        <Button
          title="응급실 지도 보기"
          onPress={() => {
            setVisible(!visible);
          }}
        />
        {visible === false ? (
          <Text>데이터를 조회 해보세요!</Text>
        ) : (
          <MapView
            style={{
              width: "100%",
              height: "100%",
            }}
            region={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.12,
              longitudeDelta: 0.12,
            }}
          >
            <Marker
              coordinate={{
                latitude: lat,
                longitude: lon,
              }}
              title="현재위치입니다."
            />
            {data.map((data) => (
              <Marker
                coordinate={{
                  latitude: data.latitude,
                  longitude: data.longitude,
                }}
                pinColor="#b967ff"
                title={data.dutyName}
              />
            ))}
          </MapView>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Button
          title="가까운 거리 순서로 응급실 리스트 보기"
          onPress={() => {
            setVisible2(!visible2);
          }}
        />
        {visible2 === false ? (
          <Text>데이터를 조회 해보세요.</Text>
        ) : (
          <View>
            {data.map((data) => (
              <EmergencyItem data={data} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default Emergency;
