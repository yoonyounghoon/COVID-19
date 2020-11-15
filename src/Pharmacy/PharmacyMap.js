import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Axios from "axios";

export default function PharmacyMap({ xPos, yPos }) {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await Axios.get(
          `http://192.168.0.10:8080/medicalHelper/pharmacy/gps/${yPos}/${xPos}?pageNo=${1}`
        );
        console.log(response.data);
        setData(response.data);
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
        <MapView
          style={{
            width: "100%",
            height: "60%",
          }}
          region={{
            latitude: xPos,
            longitude: yPos,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
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
      ) : (
        <MapView
          style={{
            width: "100%",
            height: "50%",
          }}
          region={{
            latitude: xPos,
            longitude: yPos,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: xPos,
              longitude: yPos,
            }}
            title="현재위치입니다."
          />
          {data.map((data) => (
            <Marker
              coordinate={{
                latitude: data.ypos,
                longitude: data.xpos,
              }}
              pinColor="#b967ff"
              title={data.name}
            />
          ))}
        </MapView>
      )}
    </>
  );
}
