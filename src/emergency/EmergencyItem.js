import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, Divider, Input } from "react-native-elements";
import Modal, { SlideAnimation, ModalContent } from "react-native-modals";
import MapView, { Marker } from "react-native-maps";

const EmergencyItem = ({ data }) => {
  const [isVisible, isSetVisible] = useState(false);

  const onChangeVisible = () => {
    isSetVisible(!isVisible);
  };
  return (
    <View>
      <Divider style={{ backgroundColor: "black" }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 17 }}>병원명: {data.dutyName}</Text>
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
          width="1"
        >
          <ModalContent>
            <View>
              <MapView
                style={{
                  width: "100%",
                  height: "40%",
                }}
                region={{
                  latitude: data.latitude,
                  longitude: data.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: data.latitude,
                    longitude: data.longitude,
                  }}
                  title="병원위치입니다."
                  pinColor="#b967ff"
                />
              </MapView>
              <View style={{ marginTop: 30 }}>
                <Input
                  style={{ color: "red" }}
                  label="현 위치에서의 거리"
                  disabled={true}
                  value={String(data.distance) + "km"}
                />
                <Input
                  style={{ color: "red" }}
                  label="병원명"
                  disabled={true}
                  value={data.dutyName}
                />
                <Input
                  style={{ color: "red" }}
                  label="위 치"
                  disabled={true}
                  value={data.dutyAddr}
                />
                <Input
                  style={{ color: "red" }}
                  label="전화번호"
                  disabled={true}
                  value={data.dutyTel1}
                />
              </View>
            </View>
          </ModalContent>
        </Modal>
      </View>
    </View>
  );
};
export default EmergencyItem;
