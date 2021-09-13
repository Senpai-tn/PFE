import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Navbar from "../Components/Navbar";
import { API_URL } from "@env";
import axios from "axios";

export default function ClaimInfo({ route, navigation }) {
  const UpdateClaim = async (state) => {
    axios
      .put(API_URL + "/claim/", { id: route.params.claim.id, state: state })
      .then((res) => {
        navigation.navigate("ListClaim");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <View style={{}}>
      <Navbar navigation={navigation} />
      <ScrollView style={{ width: "100%" }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 34,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {route.params.claim.description}
        </Text>
        <Image
          source={{ uri: API_URL + "/img/" + route.params.claim.images[0] }}
          style={{
            height: Dimensions.get("screen").height * 0.5,
            width: Dimensions.get("screen").width,
          }}
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: 10,
            position: "relative",
            top: 0,
            marginBottom: 0,
          }}
        >
          {route.params.claim.images.map((img, key) => {
            if (key != 0) {
              return (
                <View key={key}>
                  <Image
                    source={{
                      uri: "http://server-pfe.herokuapp.com/img/" + img,
                    }}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 20,
                      marginHorizontal: 5,
                    }}
                  />
                </View>
              );
            }
          })}
        </ScrollView>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            onLongPress={(e) => {
              console.log(e.nativeEvent.coordinate);
            }}
            initialRegion={{
              latitude: 36.73978607848884,
              longitude: 10.233539678156376,
              latitudeDelta: 0.00422,
              longitudeDelta: 0.00421,
            }}
          >
            <Marker
              coordinate={{
                longitude: 10.233539678156376,
                latitude: 36.73978607848884,
              }}
            ></Marker>
          </MapView>
        </View>
        <View
          style={{
            height: 200,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: 30,
            marginBottom: 100,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              UpdateClaim("refused");
            }}
          >
            <View
              style={{
                backgroundColor: "red",
                height: 60,
                width: 180,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
              }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "white" }}
              >
                Refuse
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              UpdateClaim("accepted");
            }}
          >
            <View
              style={{
                backgroundColor: "green",
                height: 60,
                width: 180,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
              }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "white" }}
              >
                Accept
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: "2.5%",
    marginBottom: 20,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#124578",
    padding: "5%",
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
