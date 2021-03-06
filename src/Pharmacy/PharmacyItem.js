import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, Divider, Input } from "react-native-elements";
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
          width={0.9}
        >
          <ModalContent>
            <View>
              <MapView
                style={{
                  width: "100%",
                  height: "40%",
                }}
                region={{
                  latitude: data.ypos,
                  longitude: data.xpos,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: data.ypos,
                    longitude: data.xpos,
                  }}
                  title="병원위치입니다."
                  pinColor="#b967ff"
                />
              </MapView>
              <View style={{ marginTop: 30 }}>
                <Input label="약국명" disabled={true} value={data.name} />
                <Input label="위 치" disabled={true} value={data.address} />
                <Input label="전화번호" disabled={true} value={data.tel} />
                <Input label="개업일" disabled={true} value={data.openDate} />
              </View>
            </View>
          </ModalContent>
        </Modal>
      </View>
    </View>
  );
}
