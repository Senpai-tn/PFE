import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Post(props) {
  return (
    <View style={styles.container}>
      {props.post.deleted_at != null ? (
        <View
          style={{
            position: "absolute",
            zIndex: 100,
            right: 10,
            top: 10,
          }}
        >
          <Icon size={100} name={"trash"} color={"red"} />
        </View>
      ) : null}
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("PostInfos", { post: props.post });
        }}
      >
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
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 35,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {props.post.title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 16 }}>
          {props.post.description}
        </Text>
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
