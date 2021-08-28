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
import Icon from "react-native-vector-icons/FontAwesome";
export default function BottomBar({ navigation }) {
  const route = useRoute();
  const user = useSelector((state) => state.user);
  return (
    <View>
      {user.roles == "USER" ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text
              style={{
                color: route.name == "Home" ? "#11324D" : "#C1CFC0",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              <Icon name="home" size={35} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserHome");
            }}
          >
            <Text
              style={{
                color: route.name == "UserHome" ? "#11324D" : "#C1CFC0",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Reclamation
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Text
              style={{
                color: route.name == "Profile" ? "#11324D" : "#C1CFC0",
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
    position: "relative",
    height: Dimensions.get("screen").height * 0.05,
    width: Dimensions.get("screen").width,
    backgroundColor: "#E7E0C9",
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});
