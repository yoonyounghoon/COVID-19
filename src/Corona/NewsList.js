import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";

const NewsList = ({ data2 }) => {
  const renderItem = ({ item }) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>제목 : {item.title}</ListItem.Title>
          <ListItem.Subtitle>작성날짜 : {item.wrtDt}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };
  return (
    <View>
      <FlatList
        data={data2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default NewsList;

const styles = StyleSheet.create({});
