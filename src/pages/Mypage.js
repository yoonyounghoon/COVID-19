import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { logout } from "../modules/login";
import Head from "../components/Head";
import { Input, Text, Button } from "react-native-elements";
import Axios from "axios";
import Modal, { SlideAnimation, ModalContent } from "react-native-modals";

export default function Mypage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setsex] = useState("");
  const [address, setAddress] = useState("");
  const [isVisible, isSetVisible] = useState(false);

  const [rephone, setRephone] = useState("");
  const [readdress, setReaddress] = useState("");

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
        console.log(response.data);
        setEmail(data.email);
        setName(data.name);
        setsex(data.sex);
        setPhone(data.phone);
        setAddress(data.address);
      } catch (e) {
        console.log(e);
      }
    };
    get();
  }, [phone, address]);

  const dispatch = useDispatch();

  const onChangeVisible = () => {
    isSetVisible(!isVisible);
  };

  const modify = async () => {
    try {
      await Axios.put(
        "http://192.168.0.10:8080/medicalHelper/sign",
        {
          name,
          sex,
          address: readdress,
          phone: rephone,
        },
        {
          headers: {
            token: await AsyncStorage.getItem("token"),
          },
        }
      );
      Alert.alert("수정되었습니다.");
      isSetVisible(false);
    } catch (e) {
      Alert.alert("다시 시도하세요.");
    }
  };
  const out = async () => {
    try {
      await Axios.delete("http://192.168.0.10:8080/medicalHelper/sign", {
        headers: {
          token: await AsyncStorage.getItem("token"),
        },
      });
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("name");
      dispatch(logout());
      Alert.alert("탈퇴되었습니다.");
    } catch (e) {
      Alert.alert("다시 시도하세요.");
    }
  };

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
          onPress={onChangeVisible}
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
          onPress={out}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            탈퇴하기
          </Text>
        </TouchableOpacity>
        <Modal
          visible={isVisible}
          onTouchOutside={() => {
            isSetVisible(false);
          }}
          modalAnimation={
            new SlideAnimation({
              initialValue: 0, // optional
              slideFrom: "bottom", // optional
              useNativeDriver: true, // optional
            })
          }
          width={1}
          height={0.5}
        >
          <ModalContent>
            <View>
              <Input
                placeholder="Phone"
                leftIcon={{ type: "font-awesome-5", name: "phone" }}
                onChangeText={(text) => setRephone(text)}
              />
              <Input
                placeholder="**시 **구"
                leftIcon={{ type: "font-awesome-5", name: "home" }}
                onChangeText={(text) => setReaddress(text)}
              />
              <Button
                buttonStyle={{ backgroundColor: "#ff6f69" }}
                title="수정하기"
                onPress={modify}
              />
            </View>
          </ModalContent>
        </Modal>
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
