import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { Circle, G, Line } from "react-native-svg";

class Chart extends React.PureComponent {
  render() {
    const data = [30, 20, 50, 40, 30];

    const randomColor = () =>
      ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
        0,
        7
      );

    const pieData = data
      .filter((value) => value > 0)
      .map((value, index) => ({
        value,
        svg: { fill: randomColor() },
        key: `pie-${index}`,
      }));

    return (
      <View>
        <Text>배고파</Text>
        <PieChart style={{ width: 150, height: 150 }} data={pieData}></PieChart>
      </View>
    );
  }
}

export default Chart;
