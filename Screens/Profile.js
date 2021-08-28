import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/FontAwesome";
import EditProfile from "./EditProfile";
import Navbar from "../Components/Navbar";
import BottomBar from "../Components/BottomBar";
export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  async function removeValue() {
    try {
      await AsyncStorage.removeItem("@user");
    } catch (e) {
      // remove error
    }
  }
  return (
    <View style={{ height: "100%" }}>
      <Navbar navigation={navigation} />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: Dimensions.get("screen").height * 0.6,
          width: Dimensions.get("screen").width,
        }}
      >
        <Text style={styles.text}>First Name : {state.user.firstName}</Text>
        <Text style={styles.text}>Last Name : {state.user.lastName}</Text>
        <Text style={styles.text}>Login : {state.user.login}</Text>
        <Text style={styles.text}>Email : {state.user.email}</Text>
        <Text style={styles.text}>Tel : {state.user.tel}</Text>
        <Text style={styles.text}>Adress : {state.user.adress}</Text>
        <Text style={styles.text}>
          Registred at :{" "}
          {new Date(state.user.created_at).getFullYear() +
            "/" +
            (new Date(state.user.created_at).getMonth() + 1) +
            "/" +
            new Date(state.user.created_at).getDate()}
        </Text>
        <TouchableOpacity
          style={styles.update}
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          <Text style={{ color: "orange", fontWeight: "bold", fontSize: 25 }}>
            <Ionicons name="pencil" color="orange" size={30} /> Edit profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            removeValue();
            dispatch({ type: "LOGOUT" });
          }}
        >
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 25 }}>
            <Ionicons name="power-off" color="red" size={30} /> Logout
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ position: "absolute", bottom: 0 }}>
        <BottomBar navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#1E3163",
  },
  logout: {
    position: "relative",
    bottom: "-20%",
    fontSize: 30,
    color: "#ff0000",
  },
  update: {
    position: "relative",
    bottom: "-10%",
    fontSize: 30,
    color: "#00ff00",
  },
});
