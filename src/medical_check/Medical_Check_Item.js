import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Text, Divider, Input } from "react-native-elements";
import Modal, { SlideAnimation, ModalContent } from "react-native-modals";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Fontisto";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Medical_Check_Item({ data }) {
  const [isVisible, isSetVisible] = useState(false);
  const [show, setShow] = useState(false);

  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [tel, settel] = useState("");
  const [date, setdate] = useState();

  const onChangeVisible = () => {
    isSetVisible(!isVisible);
  };
  const appointment = async () => {
    try {
      await Axios.post(
        "http://192.168.0.10:8080/reservation",
        {
          name,
          location,
          tel,
          date,
        },
        {
          headers: {
            token: await AsyncStorage.getItem("token"),
          },
        }
      );
      Alert.alert("예약완료되었습니다.");
    } catch (e) {
      Alert.alert("다시 시도하세요.");
      console.log(e);
    }
    isSetVisible(!isVisible);
  };
  return (
    <View>
      <Divider style={{ backgroundColor: "black" }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 17 }}>병원명: {data.hmcNm}</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            buttonStyle={{ backgroundColor: "#ff6f69" }}
            title="상세보기"
            onPress={onChangeVisible}
          />
        </View>
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
        >
          <ModalContent>
            <View>
              <MapView
                style={{
                  width: "100%",
                  height: "50%",
                }}
                region={{
                  latitude: data.cyVl,
                  longitude: data.cxVl,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: data.cyVl,
                    longitude: data.cxVl,
                  }}
                  title="병원위치입니다."
                  pinColor="red"
                />
              </MapView>
              <Text style={{ fontSize: 16 }}>
                {"\n"}
                병원명 : {data.hmcNm} {"\n"}
                {"\n"}
                위치 : {data.locAddr} {"\n"}
                {"\n"}
                전화번호 : {data.hmcTelNo} {"\n"}
                {"\n"}
              </Text>
              <Input
                containerStyle={{ marginBottom: 10 }}
                placeholder="달력에서 날짜를 골라주세요"
                label="Date"
                rightIcon={
                  <Icon
                    name="date"
                    size={28}
                    onPress={() => {
                      setShow(true);
                      setname(data.hmcNm);
                      setlocation(data.locAddr);
                      settel(data.hmcTelNo);
                    }}
                  />
                }
                rightIconContainerStyle={{ marginRight: 10 }}
                value={
                  date
                    ? `${date.getFullYear()}-${
                        date.getMonth() + 1
                      }-${date.getDate()}`
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
                      setdate(d);
                    }
                  }}
                  onCancel={() => setShow(false)}
                />
              )}
              <Button
                buttonStyle={{ backgroundColor: "#ff6f69" }}
                title="예약하기"
                onPress={appointment}
              />
            </View>
          </ModalContent>
        </Modal>
      </View>
    </View>
  );
}
