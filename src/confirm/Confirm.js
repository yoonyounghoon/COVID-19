import Axios from "axios";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View, FlatList } from "react-native";
import { Button, ListItem } from "react-native-elements";
import Head from "../components/Head";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Confirm = () => {
  const [isData, setisData] = useState(false);
  const [data, setdata] = useState();

  const getData = async () => {
    try {
      const response = await Axios.get("http://192.168.0.10:8080/reservation", {
        headers: {
          token: await AsyncStorage.getItem("token"),
        },
      });

      setdata(response.data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    setisData(true);
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>병원명: {item.name}</ListItem.Title>
          <ListItem.Subtitle>
            날짜 : {item.date.substring(0, 10)}
          </ListItem.Subtitle>
          <Text>위치 : {item.location}</Text>
          <Text>전화번호 : {item.tel}</Text>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <View>
      <Head />
      <Button
        title="예약 내역 확인"
        buttonStyle={{ backgroundColor: "#ff6f69" }}
        onPress={getData}
        containerStyle={{ marginTop: 30, marginBottom: 30 }}
      />
      {isData ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>예약 내용이 없습니다.</Text>
      )}
    </View>
  );
};

export default Confirm;
