import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Modal, { ModalContent } from "react-native-modals";
import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";

const Map = ({ xPos, yPos, data }) => {
  return (
    <MapView
      style={{
        width: "100%",
        height: "60%",
      }}
      region={{
        latitude: xPos,
        longitude: yPos,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: xPos,
          longitude: yPos,
        }}
        title="현재위치입니다."
        description="병원위치"
      />
      {/* {data.map((data) => (
        <Marker
          coordinate={{
            latitude: data.ypos,
            longitude: data.xpos,
          }}
          pinColor="yellow"
          title={data.name}
          description="병원위치"
        />
      ))} */}
    </MapView>
  );
};
export default Map;
