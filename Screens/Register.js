import React, { useEffect, useState } from "react";
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
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function Register({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [Login, setLogin] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [FirstNameError, setFirstNameError] = useState("");
  const [LastName, setLastName] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [Tel, setTel] = useState("");
  const [TelError, setTelError] = useState(false);
  const [Adress, setAdress] = useState("");
  const [AdressError, setAdressError] = useState("");
  const [LoginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });
  });

  function onTextChanged(e) {
    if (/^\d+$/.test(e.toString())) {
      setTel(e);
      setTelError("");
    } else {
      setTelError("Not Valid number of mobile");
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
  async function StoreUser(user) {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (e) {
      // saving error
    }
  }
  const RegisterAction = () => {
    if (FirstName.trim() == "") {
      setFirstNameError("required");
      return;
    } else {
      setFirstNameError("");
    }

    if (LastName.trim() == "") {
      setLastNameError("required");
      return;
    } else {
      setLastNameError("");
    }
    if (Login.trim() == "") {
      setLoginError("required");
      return;
    } else {
      setLoginError("");
    }
    if (Tel.trim() == "") {
      setTelError("required");
      return;
    } else {
      setTelError("");
    }
    if (Adress.trim() == "") {
      setAdressError("required");
      return;
    } else {
      setAdressError("");
    }
    if (Email.trim() == "") {
      setEmailError("required");
      return;
    } else {
      setEmailError("");
    }
    if (Password.trim() == "") {
      setPasswordError("required");
      return;
    } else {
      setPasswordError("");
    }

    if (TelError) {
      alert("Please valid your number of mobile");
      return;
    }
    axios
      .post(API_URL + "/register", {
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        adress: Adress,
        tel: Tel,
        login: Login,
        password: Password,
        expo_id: expoPushToken,
      })
      .then((res) => {
        if (res.data.message == "exist") {
          setLoginError("Login exist");
        } else if (res.data.message == "success") {
          StoreUser(res.data.user);
          dispatch({ type: "LOGGED", user: res.data.user });
        } else {
        }
      })
      .catch((e) => {
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
              placeholder={"First Name"}
              leftIcon={<Icon name="vcard" size={30} color="#1CC5DC" />}
            />
            <Text
              style={{
                color: "#f00",
                textAlign: "left",
                fontSize: 15,
                marginTop: -20,
              }}
            >
              {FirstNameError}
            </Text>
            <Input
              onChangeText={(e) => {
                setLastName(e);
              }}
              placeholder="Last Name"
              leftIcon={<Icon name="vcard" size={30} color="#1CC5DC" />}
            />
            <Text
              style={{
                color: "#f00",
                textAlign: "left",
                fontSize: 15,
                marginTop: -20,
              }}
            >
              {LastNameError}
            </Text>
            <Input
              onChangeText={(e) => {
                setLogin(e);
              }}
              placeholder="Login"
              leftIcon={<Icon name="user" size={30} color="#1CC5DC" />}
            />

            <Text
              style={{
                color: "#f00",
                textAlign: "left",
                fontSize: 15,
                marginTop: -20,
              }}
            >
              {LoginError}
            </Text>

            <Input
              keyboardType="number-pad"
              onChangeText={(e) => onTextChanged(e)}
              placeholder="Tel"
              leftIcon={<Icon name="phone" size={30} color="#1CC5DC" />}
            />

            <Text
              style={{
                color: "#f00",
                textAlign: "left",
                fontSize: 15,
                marginTop: -20,
              }}
            >
              {TelError}
            </Text>

            <Input
              onChangeText={(e) => {
                setAdress(e);
              }}
              placeholder="Adress"
              leftIcon={<Icon name="map" size={30} color="#1CC5DC" />}
            />
            <Text
              style={{
                color: "#f00",
                textAlign: "left",
                fontSize: 15,
                marginTop: -20,
              }}
            >
              {AdressError}
            </Text>

            <Input
              onChangeText={(e) => {
                setEmail(e);
              }}
              placeholder="Email"
              leftIcon={<Icon name="envelope" size={30} color="#1CC5DC" />}
            />
            <Text
              style={{
                color: "#f00",
                textAlign: "left",
                fontSize: 15,
                marginTop: -20,
              }}
            >
              {EmailError}
            </Text>
            <Input
              secureTextEntry={true}
              onChangeText={(e) => {
                setPassword(e);
              }}
              placeholder="Password"
              leftIcon={<Icon name="lock" size={30} color="#1CC5DC" />}
            />
            <Text
              style={{
                color: "#f00",
                textAlign: "left",
                fontSize: 15,
                marginTop: -20,
              }}
            >
              {PasswordError}
            </Text>
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
    backgroundColor: "#fff",
  },
  form: {
    height: 300,
    width: "80%",
    marginHorizontal: "10%",
  },
});
