import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "@env";
import Navbar from "../Components/Navbar";
import User from "../Components/User";
import { StyleSheet, Text, View } from "react-native";

export function Users({ navigation }) {
  const [Users, setUsers] = useState([]);

  const getUsers = async () => {
    axios.get(API_URL).then((res) => {
      setUsers(res.data.users);
    });
  };

  async function removeValue() {
    try {
      await AsyncStorage.removeItem("@user");
    } catch (e) {
      // remove error
    }
  }

  useEffect(() => {
    getUsers();
    return () => {};
  }, []);

  return (
    <View style={{}}>
      <Navbar navigation={navigation} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#857861",
          height: 60,
          alignItems: "center",
        }}
      >
        <Text style={styles.header}>Blocked</Text>
        <Text style={styles.header}>Id</Text>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.header}>First Name</Text>
        <Text style={styles.header}>Last Name</Text>
      </View>

      <View style={{ marginTop: 10 }}>
        {Users.map((user, key) => {
          return <User user={user} key={key} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { color: "white", fontWeight: "bold", fontSize: 18 },
});
