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
import PostInfo from "./Screens/PostInfo";
import AddClaim from "./Screens/AddClaim";
import AddPost from "./Screens/AddPost";
import axios from "axios";
import { API_URL } from "@env";
import { Users } from "./Screens/Users";
import ListClaim from "./Screens/ListClaim";
import ClaimInfo from "./Screens/ClaimInfo";
import ListRoles from "./Screens/ListRoles";

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
      ) : state.user.roles.includes("ADMIN") ||
        state.user.roles.includes("POST_MANAGER") ||
        state.user.roles.includes("CLAIM_MANAGER") ? (
        <Admin.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Admin.Screen
            name="Posts"
            options={{ title: "Manage Users" }}
            component={Home}
          />
          <Admin.Screen name="Users" component={Users} />

          <Admin.Screen name="Profile" component={Profile} />
          <Admin.Screen name="ListClaim" component={ListClaim} />
          <Admin.Screen name="ClaimInfo" component={ClaimInfo} />
          <Admin.Screen name="PostInfos" component={PostInfo} />
          <Admin.Screen name="AddPost" component={AddPost} />
          <Admin.Screen name="AddClaim" component={AddClaim} />
          <Admin.Screen name="ListRoles" component={ListRoles} />
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
          <User.Screen name="AddClaim" component={AddClaim} />
          <User.Screen name="Profile" component={Profile} />
          <User.Screen name="EditProfile" component={EditProfile} />
          <User.Screen name="PostInfos" component={PostInfo} />
        </User.Navigator>
      )}
    </NavigationContainer>
  );
}
