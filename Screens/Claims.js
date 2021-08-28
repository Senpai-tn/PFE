import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import BottomBar from "../Components/BottomBar";
export default function Claims({ navigation }) {
  const user = useSelector((state) => state.user);
  return (
    <View style={{ height: "100%" }}>
      {user.claims.map((claim, key) => {
        return (
          <TouchableOpacity
            onLongPress={() => {
              alert("test");
            }}
          >
            <View key={key}>
              <Text>{claim.description}</Text>
              <Image
                style={{ height: 100, width: 100 }}
                source={{
                  uri: "http://server-pfe.herokuapp.com/img/" + claim.images[0],
                }}
              />
              <Text>{claim.state}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <View style={{ position: "absolute", bottom: 0 }}>
        <BottomBar navigation={navigation} />
      </View>
    </View>
  );
}
