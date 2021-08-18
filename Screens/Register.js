import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements/dist/input/Input";
import axios from "axios";
import { API_TOKEN, API_URL } from "@env";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register({ navigation }) {
  const [Login, setLogin] = useState("");
  const [Password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [LoginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  async function StoreUser(user) {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (e) {
      // saving error
    }
  }
  const RegisterAction = () => {
    axios
      .post(API_URL + "/register", {
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        adress: "",
        tel: "",
        login: Login,
        password: Password,
      })
      .then((res) => {
        if (res.data.message == "exist") {
          setLoginError(true);
        } else if (res.data.message == "success") {
          StoreUser(res.data.user);
          dispatch({ type: "LOGGED", user: res.data.user });
        } else {
        }
      })
      .catch((e) => {
        console.log(API_URL + "/register");
        console.log(e.message);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <Input
              onChangeText={(e) => {
                setFirstName(e);
              }}
              placeholder={"Login"}
              leftIcon={<Icon name="vcard" size={30} color="#1CC5DC" />}
            />
            <Input
              onChangeText={(e) => {
                setLastName(e);
              }}
              placeholder="Last Name"
              leftIcon={<Icon name="vcard" size={30} color="#1CC5DC" />}
            />
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
                Login exist
              </Text>
            ) : null}
            <Input
              onChangeText={(e) => {
                setPassword(e);
              }}
              placeholder="Password"
              leftIcon={<Icon name="lock" size={30} color="#1CC5DC" />}
            />
            <Input
              onChangeText={(e) => {
                setEmail(e);
              }}
              placeholder="Email"
              leftIcon={<Icon name="envelope" size={30} color="#1CC5DC" />}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              RegisterAction();
            }}
          >
            <View style={{ backgroundColor: "#1CC5DC" }}>
              <Text
                style={{ color: "#F5F7B2", textAlign: "center", fontSize: 35 }}
              >
                Register
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <View style={{ backgroundColor: "#890596", marginTop: "10%" }}>
              <Text
                style={{ color: "#F5F7B2", textAlign: "center", fontSize: 35 }}
              >
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    paddingTop: 100,
    backgroundColor: "#F5F7B2",
  },
  form: {
    height: 300,
    width: "80%",
    marginHorizontal: "10%",
  },
});
