import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "react-native-elements";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { logout } from "../modules/login";

const Head = () => {
  const dispatch = useDispatch();

  const onClick = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("name");
      dispatch(logout());
      console.log("로그아웃 완료");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Header
      placement={"left"}
      containerStyle={{
        backgroundColor: "#009387",
        alignItems: "flex-start",
      }}
      centerComponent={{
        text: "Medical-Helper",
        style: { color: "#fff", fontSize: 25 },
      }}
      rightComponent={
        <Button
          buttonStyle={{ backgroundColor: "#00334e" }}
          title="로그아웃"
          onPress={onClick}
        />
      }
    />
  );
};
export default Head;
