import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";

const Map = ({ xPos, yPos, data }) => {
  console.log(data);
  return (
    <View>
      <MapView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
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
        {data.map((data) => (
          <Marker
            coordinate={{
              latitude: data.ypos,
              longitude: data.xpos,
            }}
            title={data.name}
            description="병원위치"
          />
        ))}
      </MapView>
    </View>
  );
};
export default Map;
