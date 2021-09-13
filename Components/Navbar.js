import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function Navbar({ navigation }) {
  const route = useRoute();
  const user = useSelector((state) => state.user);
  return (
    <View>
      {user.roles.includes("ADMIN") ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Posts");
            }}
          >
            <Text
              style={{
                color: route.name == "Posts" ? "red" : "#fff",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Posts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Users");
            }}
          >
            <Text
              style={{
                color: route.name == "Users" ? "red" : "#fff",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Users
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListClaim");
            }}
          >
            <Text
              style={{
                color: route.name == "ListClaim" ? "red" : "#fff",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Claims
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Text
              style={{
                color: route.name == "Profile" ? "red" : "#fff",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 0.1,
    width: "100%",
    backgroundColor: "#253698",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});
