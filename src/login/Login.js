import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../modules/login";
import { Input } from "react-native-elements";

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onClick = async (e) => {
    // 데이터 푸쉬
    try {
      const response = await Axios.post(
        "http://192.168.0.10:8080/medicalHelper/sign/signIn",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const { data, status } = response;

      if (status === 200) {
        console.log("로그인 성공");
        console.log(data);
        const token = data.token;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("name", data.name);
        dispatch(login());
      }
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };

  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.text}>Medical-Helper</Text>
      </View>
      <View style={styles.content}>
        <Input
          placeholder="Email"
          label="이메일"
          leftIcon={{ type: "material-community", name: "email" }}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          label="비밀번호"
          placeholder="Password"
          leftIcon={{ type: "entypo", name: "lock" }}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={{
            height: "50%",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#009387",
            margin: 2,
            justifyContent: "center",
          }}
          onPress={onClick}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            로그인
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
          onPress={goToSignUp}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  head: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#009387",
  },
  content: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 2,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "space-evenly",
  },
  text: {
    color: "white",
    fontSize: 40,
    marginBottom: 30,
  },
  contentsText: {
    alignItems: "flex-start",
    fontSize: 20,
  },
});
