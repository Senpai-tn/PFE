import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Dashboard() {
  return (
    <View>
      <Text>Dashboard</Text>
      <TouchableOpacity
        onPress={() => {
          console.log("logout");
        }}
      >
        <Text style={{ fontSize: 50 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
