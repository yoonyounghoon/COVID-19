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
          title="현재 위치입니다."
          description="현재위치"
          onPress={() => Alert.alert("ㅎㅇ")}
        />
      </MapView>
    </View>
  );
};
export default Map;
