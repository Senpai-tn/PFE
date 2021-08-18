import React from "react";
import { View, Text, Image } from "react-native";

export default function Post(props) {
  return (
    <View>
      <Image
        source={{ uri: props.user.image }}
        style={{ height: 100, width: 100 }}
      />
      <Text>{props.user.title}</Text>
      <Text>{props.user.description}</Text>
    </View>
  );
}
