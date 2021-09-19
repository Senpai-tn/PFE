import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { API_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const state = useSelector((state) => state);
  const [Login, setLogin] = useState("");
  const [LoginError, setLoginError] = useState(false);
  const [deletedError, setDeletedError] = useState(false);
  const [Password, setPassword] = useState("");
  const [PasswordError, setPasswordError] = useState(false);

  const dispatch = useDispatch(); //hooks
  async function StoreUser(user) {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (e) {
      // saving error
    }
  }

  function LoginAction() {
    axios
      .post(API_URL + "/login", {
        login: Login,
        password: Password,
      })
      .then((res) => {
        if (res.data.message == "not exist") {
          setLoginError(true);
          setPasswordError(false);
          setDeletedError(false);
        }
        if (res.data.message == "password error") {
          setLoginError(false);
          setPasswordError(true);
          setDeletedError(false);
        }
        if (res.data.message == "user blocked") {
          setLoginError(false);
          setPasswordError(false);
          setDeletedError(true);
        }
        if (res.data.message == "success") {
          StoreUser(res.data.user);
          dispatch({ type: "LOGGED", user: res.data.user });
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.form}>
          <Input
            onChangeText={(e) => {
              setLogin(e);
            }}
            placeholder="Login"
            leftIcon={<Icon name="user" size={30} color="#1CC5DC" />}
          />
          {LoginError ? (
            <Text
              style={{
                color: "#f00",
                textAlign: "left",
                fontSize: 15,
                marginTop: -20,
              }}
            >
              Login not foud
            </Text>
          ) : null}
          {deletedError ? (
            <Text
              style={{
                color: "#f00",
                textAlign: "left",
                fontSize: 15,
                marginTop: -20,
              }}
            >
              This accompt was deleted
            </Text>
          ) : null}
          <Input
            onChangeText={(e) => {
              setPassword(e);
            }}
            placeholder="Password"
            leftIcon={<Icon name="lock" size={30} color="#1CC5DC" />}
          />
          {PasswordError ? (
            <Text
              style={{
                color: "#f00",
                textAlign: "left",
                fontSize: 15,
                marginTop: -20,
              }}
            >
              Verify your password
            </Text>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              LoginAction();
            }}
          >
            <View style={{ backgroundColor: "#1CC5DC" }}>
              <Text
                style={{ color: "#F5F7B2", textAlign: "center", fontSize: 35 }}
              >
                Login
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <View style={{ backgroundColor: "#890596", marginTop: "10%" }}>
              <Text
                style={{ color: "#F5F7B2", textAlign: "center", fontSize: 35 }}
              >
                Register
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
  },
  form: {
    height: 300,
    width: "80%",
    marginHorizontal: "10%",
  },
});
