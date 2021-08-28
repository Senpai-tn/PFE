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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/FontAwesome";
import Profile from "./Screens/Profile";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Upload from "./Screens/Upload";
import Notif from "./Screens/Notif";
import EditProfile from "./Screens/EditProfile";
import Navbar from "./Components/Navbar";
import Claims from "./Screens/Claims";

function HomeScreen({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  async function removeValue() {
    try {
      await AsyncStorage.removeItem("@user");
    } catch (e) {
      // remove error
    }
  }

  return (
    <View style={{}}>
      <Navbar navigation={navigation} />
      <Text>Home Screen {state.user.roles.length}</Text>

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
        <Auth.Navigator screenOptions={{ headerShown: false }}>
          <Auth.Screen name="Login" component={Login} />
          <Auth.Screen name="Register" component={Register} />
        </Auth.Navigator>
      ) : state.user.roles.includes("ADMIN") ? (
        <Admin.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Admin.Screen name="Admin" component={HomeScreen} />
          <Admin.Screen
            name="Posts"
            options={{ title: "Manage Users" }}
            component={HomeScreen}
          />
          <Admin.Screen name="Profile" component={Profile} />
          <Admin.Screen
            options={{ tabBarStyle: { display: "none" } }}
            name="EditProfile"
            component={EditProfile}
          />
        </Admin.Navigator>
      ) : (
        <User.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "UserHome") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "Profile") {
                iconName = focused ? "user" : "user-o";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            tabBarActiveTintColor: "#FF3F00",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <User.Screen name="Home" component={Home} />
          <User.Screen name="UserHome" component={Claims} />
          <User.Screen name="Profile" component={Profile} />
          <User.Screen name="EditProfile" component={EditProfile} />
        </User.Navigator>
      )}
    </NavigationContainer>
  );
}
