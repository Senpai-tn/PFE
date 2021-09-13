import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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
      <ScrollView>
        {claims.map((claim, key) => {
          return <Claim claim={claim} navigation={navigation} key={key} />;
        })}
      </ScrollView>
    </View>
  );
}
