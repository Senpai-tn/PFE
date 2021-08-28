import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Post(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={{
            uri: "http://server-pfe.herokuapp.com/img/" + props.post.images[0],
          }}
          style={{
            height: 350,
            width: "100%",
            resizeMode: "contain",
          }}
        />
        <Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}>
          {props.post.title}
        </Text>
        <Text>{props.post.description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
    marginBottom: 50,
    backgroundColor: "#BFA2DB",
    borderRadius: 30,

    padding: 30,
    paddingTop: 10,
  },
});
