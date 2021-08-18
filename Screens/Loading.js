import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Loading() {
  const dispatch = useDispatch();
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@user");
      jsonValue = JSON.parse(value);
      if (jsonValue !== "") {
        dispatch({ type: "LOGGED", user: jsonValue });
      }
    } catch (e) {}
  };
  useEffect(() => {
    _retrieveData();

    return () => {};
  }, []);
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}
