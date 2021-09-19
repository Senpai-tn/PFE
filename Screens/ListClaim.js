import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Navbar from "../Components/Navbar";
import { API_URL } from "@env";
import Claim from "../Components/Claim";

export default function ListClaim({ navigation }) {
  const [claims, setClaims] = useState([]);
  const GetClaims = async () => {
    axios.get(API_URL + "/claim/").then((res) => {
      setClaims(res.data.claim);
    });
  };

  useEffect(() => {
    GetClaims();
    return () => {};
  }, []);

  return (
    <View>
      <Navbar navigation={navigation} />
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddClaim");
          }}
          style={{
            height: 50,
            width: "35%",
            top: 5,
            right: 0,
            position: "absolute",
            zIndex: 110,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Add a claim
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {claims.map((claim, key) => {
          return <Claim claim={claim} navigation={navigation} key={key} />;
        })}
      </ScrollView>
    </View>
  );
}
