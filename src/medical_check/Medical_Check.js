import Axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Head from "../components/Head";
import RNPickerSelect from "react-native-picker-select";
import { Button, Divider, Text } from "react-native-elements";
import Medical_CheckList from "./Medical_CheckList";
import Medical_Check_Item from "./Medical_Check_Item";

const key =
  "OW%2B7pApxaWyA%2FMtp4h809DV8bN%2FTeDY%2B6RVsTr5ZsS4Peuz2gAmUOTBpsqyZc0ITRd%2FIyE5qor%2B2cCxo42moPQ%3D%3D";

const Medical_Check = () => {
  const [value, setvalue] = useState("");
  const [value2, setvalue2] = useState("");
  const [data, setData] = useState();
  const [isData, setisData] = useState(false);

  const onClick = async () => {
    try {
      const response = await Axios.get(
        `http://openapi1.nhis.or.kr/openapi/service/rest/HmcSearchService/getHmcList?Servicekey=${key}&siDoCd=${value}&siGunGuCd=${value2}`
      );
      setData(response.data.response.body.items.item);
      setisData(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Head />
      <View style={styles.select}>
        <View
          style={{
            alignItems: "center",
            marginBottom: 15,
            marginTop: 15,
          }}
        >
          <Text h4> 건강검진 병원 조회</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text h4 style={{ marginLeft: 10 }}>
            시도명 :
          </Text>
          <RNPickerSelect
            placeholder={{
              label: "시도를 골라주세요",
            }}
            style={{
              placeholder: {
                color: "black",
                fontSize: 16,
                marginLeft: 5,
                borderWidth: 1,
                height: 40,
                width: 280,
              },
            }}
            onValueChange={(value) => setvalue(value)}
            items={[
              { label: "서울시", value: "11" },
              { label: "부산시", value: "26" },
              { label: "대구시", value: "27" },
              { label: "인천시", value: "28" },
              { label: "광주시", value: "29" },
              { label: "대전시", value: "30" },
              { label: "울산시", value: "31" },
              { label: "경기도", value: "41" },
              { label: "강원도", value: "42" },
              { label: "충북도", value: "43" },
              { label: "충남도", value: "44" },
              { label: "전북도", value: "45" },
              { label: "전남도", value: "46" },
              { label: "경북도", value: "47" },
              { label: "경남도", value: "48" },
              { label: "제주도", value: "50" },
            ]}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text h4 style={{ marginLeft: 10 }}>
            시군구명 :{" "}
          </Text>
          <RNPickerSelect
            placeholder={{
              label: "시군구를 골라주세요",
            }}
            style={{
              placeholder: {
                color: "black",
                fontSize: 16,
                marginLeft: 5,
                borderWidth: 1,
                width: 280,
                height: 40,
              },
            }}
            onValueChange={(value) => setvalue2(value)}
            items={[
              { label: "종로구", value: "110" },
              { label: "중구", value: "140" },
              { label: "용산구", value: "170" },
              { label: "성동구", value: "200" },
              { label: "광진구", value: "215" },
              { label: "동대문구", value: "230" },
              { label: "중랑구", value: "260" },
              { label: "성북구", value: "290 " },
              { label: "강북구", value: "305" },
              { label: "도봉구", value: "320" },
              { label: "노원구", value: "350" },
              { label: "은평구", value: "380" },
              { label: "서대문구", value: "410" },
              { label: "마포구", value: "440" },
              { label: "양천구", value: "470" },
              { label: "강서구", value: "500" },
              { label: "구로구", value: "530" },
              { label: "금천구", value: "545" },
              { label: "영등포구", value: "560" },
              { label: "동작구", value: "590" },
              { label: "관악구", value: "620" },
              { label: "서초구", value: "650" },
              { label: "강남구", value: "680" },
              { label: "송파구", value: "710" },
              { label: "강동구", value: "740" },
            ]}
          />
        </View>
      </View>
      <Button
        title="조회하기"
        onPress={onClick}
        buttonStyle={{ backgroundColor: "#ff6f69" }}
      />

      <ScrollView style={styles.list}>
        {isData === false ? (
          <Text h4>지역을 선택해주세요.</Text>
        ) : (
          data.map((data) => <Medical_Check_Item data={data} />)
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  select: {
    backgroundColor: "#dfe3ee",
  },
  list: {
    backgroundColor: "#b2d8d8",
  },
});

export default Medical_Check;
