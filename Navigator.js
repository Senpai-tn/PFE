import React, { useEffect, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Screens/Loading";
import Register from "./Screens/Register";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { TouchableOpacity } from "react-native";
import Dashboard from "./Screens/Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Post from "./Components/Post";
import Home from "./Screens/Home";

function HomeScreen() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  async function removeValue() {
    try {
      await AsyncStorage.removeItem("@user");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen {state.user.roles.length}</Text>
      <Post
        user={{
          title: "hhhhhh",
          description: "ffffffff",
          image: "https://cdn.sandberg.world/products/images/lg/640-81_lg.jpg",
        }}
      />
      <TouchableOpacity
        onPress={() => {
          removeValue();
          dispatch({ type: "NOT_LOGGED" });
        }}
      >
        <Icon name="logout" />
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Auth = createNativeStackNavigator();
const User = createNativeStackNavigator();
const Admin = createNativeStackNavigator();
export default function Navigator() {
  const state = useSelector((state) => state);

  useEffect(() => {
    return () => {};
  }, [state]);
  return (
    <NavigationContainer>
      <StatusBar />
      {state.isLoading ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={Loading} />
        </Stack.Navigator>
      ) : state.user == null ? (
        <User.Navigator screenOptions={{ headerShown: false }}>
          <User.Screen name="Login" component={Login} />
          <User.Screen name="Register" component={Register} />
        </User.Navigator>
      ) : state.user.roles.length == 1 ? (
        <User.Navigator>
          <User.Screen name="User" component={Home} />
        </User.Navigator>
      ) : (
        <Admin.Navigator>
          <Admin.Screen name="Admin" component={HomeScreen} />
        </Admin.Navigator>
      )}
    </NavigationContainer>
  );
}
