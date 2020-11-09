import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Header } from "react-native-elements";
import { logout } from "../modules/login";
import Head from "../components/Head";
import { ButtonGroup, Input, Text, Button } from "react-native-elements";
import { set } from "react-native-reanimated";
import Axios from "axios";

export default function Mypage() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const get = async () => {
      try {
        const response = await Axios.get(
          "http://192.168.0.10:8080/medicalHelper/sign",
          {
            headers: {
              token: await AsyncStorage.getItem("token"),
            },
          }
        );
        const { data } = response;

        setEmail(data.email);
        setName(data.name);
        setPhone(data.phone);
        setAddress(data.address);
      } catch (e) {
        console.log(e);
      }
    };
    get();
  });

  return (
    <View style={styles.container}>
      <Head style={styles.head} />
      <View style={styles.contents}>
        <Input
          label="Email"
          leftIcon={{ type: "material-community", name: "email" }}
          disabled={true}
          value={email}
        />
        <Input
          label="Name"
          leftIcon={{ type: "antdesign", name: "user" }}
          disabled={true}
          value={name}
        />
        <Input
          label="Phone"
          leftIcon={{ type: "font-awesome-5", name: "phone" }}
          disabled={true}
          value={phone}
        />
        <Input
          label="Address"
          leftIcon={{ type: "font-awesome-5", name: "home" }}
          disabled={true}
          value={address}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            height: "50%",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#009387",
            margin: 2,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            수정하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            height: "50%",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#009387",
            margin: 2,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            탈퇴하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: { flex: 1 },
  contents: {
    flex: 4,
    backgroundColor: "white",
    justifyContent: "center",
  },
  footer: { flex: 1, backgroundColor: "white" },
});
