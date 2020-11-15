import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Text } from "react-native-elements";

const Chart = ({ data }) => {
  return (
    <View>
      <LineChart
        data={{
          labels: [
            data[5].createDt.substring(5, 10),
            data[4].createDt.substring(5, 10),
            data[3].createDt.substring(5, 10),
            data[2].createDt.substring(5, 10),
            data[1].createDt.substring(5, 10),
            data[0].createDt.substring(5, 10),
          ],
          datasets: [
            {
              data: [
                data[5].decideCnt / 10000,
                data[4].decideCnt / 10000,
                data[3].decideCnt / 10000,
                data[2].decideCnt / 10000,
                data[1].decideCnt / 10000,
                data[0].decideCnt / 10000,
              ],
            },
          ],
        }}
        width={Dimensions.get("screen").width}
        height={220}
        yAxisSuffix="(만)"
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text h3>{data[0].createDt.substring(0, 10)}</Text>
        <Text h4>확진환자 : {data[0].decideCnt.toLocaleString()}명</Text>
        <Text h4>검사중 : {data[0].examCnt.toLocaleString()}명</Text>
        <Text h4>격리해제 : {data[0].clearCnt.toLocaleString()}명</Text>
        <Text h4> 사망자 : {data[0].deathCnt.toLocaleString()}명</Text>
      </View>
    </View>
  );
};

export default Chart;
