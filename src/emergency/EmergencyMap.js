import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Axios from "axios";
import { Text } from "react-native";

const key =
  "OW%2B7pApxaWyA%2FMtp4h809DV8bN%2FTeDY%2B6RVsTr5ZsS4Peuz2gAmUOTBpsqyZc0ITRd%2FIyE5qor%2B2cCxo42moPQ%3D%3D";

export default function EmergencyMap({ xPos, yPos }) {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await Axios.get(
          `http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytLcinfoInqire?Servicekey=${key}&WGS84_LON=${yPos}&WGS84_LAT=${xPos}&pageNo=2&numOfRows=1`
        );
        console.log(response.data);
        setData(response.data.response.body.items.item[0]);
        console.log(data);
        setVisible(true);
      } catch (e) {
        console.log(e);
      }
    };
    get();
  }, [xPos, yPos]);

  return (
    <>
      {visible === false ? (
        <Text>로딩중..</Text>
      ) : (
        <MapView
          style={{
            width: "100%",
            height: "50%",
          }}
          region={{
            latitude: xPos,
            longitude: yPos,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}
        >
          <Marker
            coordinate={{
              latitude: xPos,
              longitude: yPos,
            }}
            title="현재위치입니다."
          />
        </MapView>
      )}
    </>
  );
}
