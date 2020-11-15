import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, Divider } from "react-native-elements";
import Modal, { SlideAnimation, ModalContent } from "react-native-modals";
import MapView, { Marker } from "react-native-maps";

export default function PharmacyItem({ data }) {
  const [isVisible, isSetVisible] = useState(false);
  const onChangeVisible = () => {
    isSetVisible(!isVisible);
  };
  return (
    <View>
      <Divider style={{ backgroundColor: "black" }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 18, marginLeft: 5 }}>약국명: {data.name}</Text>
        <Button title="상세보기" onPress={onChangeVisible} />

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
                  height: "60%",
                }}
                region={{
                  latitude: data.ypos,
                  longitude: data.xpos,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: data.ypos,
                    longitude: data.xpos,
                  }}
                  title="현재위치입니다."
                  pinColor="#b967ff"
                  description="병원위치"
                />
              </MapView>
              <Text style={{ fontSize: 16 }}>
                {"\n"}
                약국명 : {data.name} {"\n"}
                {"\n"}
                위치 : {data.address} {"\n"}
                {"\n"}
                전화번호 : {data.tel} {"\n"}
                {"\n"}
                개업일 : {data.openDate} {"\n"}
                {"\n"}
              </Text>
            </View>
          </ModalContent>
        </Modal>
      </View>
    </View>
  );
}
