import Axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ButtonGroup, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/Fontisto";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState();
  const [birth, setBirth] = useState();
  const [address, setAddress] = useState("");
  const [selectedIdx, setSI] = useState();
  const buttons = ["남", "여"];
  const [show, setShow] = useState(false);

  const onClick = async (e) => {
    // 새로고침방지
    e.preventDefault();

    console.log(email, password, name);
    // 데이터 서버에 전송하는 내용
    try {
      const response = await Axios.post(
        "http://192.168.0.10:8080/medicalHelper/sign/signUp",
        {
          email,
          password,
          name,
          phone,
          sex,
          birth,
          address,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      Alert.alert("회원가입 완료");
    } catch (error) {
      console.log(error);
    }
    // 폼 초기화
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setAddress("");
    setBirth("");
    setSex("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text h1 style={{ color: "white" }}>
          Medical-Helper
        </Text>
      </View>

      <View style={styles.contents}>
        <Input
          placeholder="Email"
          leftIcon={{ type: "material-community", name: "email" }}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "entypo", name: "lock" }}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Name"
          leftIcon={{ type: "antdesign", name: "user" }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Phone"
          leftIcon={{ type: "font-awesome-5", name: "phone" }}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder="**시 **구"
          leftIcon={{ type: "font-awesome-5", name: "home" }}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          containerStyle={{ marginBottom: 10 }}
          placeholder="달력에서 날짜를 골라주세요"
          leftIcon={{ type: "font-awesome-5", name: "birthday-cake" }}
          leftIconContainerStyle={{ marginRight: 10 }}
          label="Birthday"
          rightIcon={
            <Icon
              name="date"
              size={28}
              onPress={() => {
                setShow(true);
              }}
            />
          }
          rightIconContainerStyle={{ marginRight: 10 }}
          value={
            birth
              ? `${birth.getFullYear()}-${
                  birth.getMonth() + 1
                }-${birth.getDate()}`
              : ""
          }
        />
        {show && (
          <DateTimePickerModal
            mode="date"
            isVisible={show}
            onConfirm={(d) => {
              if (d) {
                setShow(false);
                setBirth(d);
              }
            }}
            onCancel={() => setShow(false)}
          />
        )}
        <ButtonGroup
          selectedIndex={selectedIdx}
          buttons={buttons}
          onPress={(e) => {
            setSI(e);
            setSex(buttons[e]);
          }}
          selectedButtonStyle={{ backgroundColor: "#009387" }}
        />
      </View>

      {/* 버튼*/}
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            height: "60%",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#009387",
            margin: 20,
          }}
          onPress={onClick}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            가입하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  head: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contents: {
    flex: 4,
    paddingTop: 10,
    backgroundColor: "white",
  },
  footer: {
    flex: 1,
    backgroundColor: "white",
  },
  textinput: {
    width: "90%",
    height: "8%",
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "white",
    marginBottom: 10,
  },
});
