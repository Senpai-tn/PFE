import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfile({ navigation }) {
  const user = useSelector((state) => state.user);
  const [Login, setLogin] = useState(user.login);
  const [Password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState(user.firstName);
  const [LastName, setLastName] = useState(user.lastName);
  const [Email, setEmail] = useState(user.email);
  const [Tel, setTel] = useState(user.tel);
  const [Adress, setAdress] = useState(user.adress);
  const [LoginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  async function StoreUser(user) {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (e) {
      // saving error
    }
  }

  function UpdateAction() {
    axios
      .put(API_URL + "/", {
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        adress: Adress,
        tel: Tel,
        login: Login,
        password: Password,
      })
      .then((res) => {
        if (res.data.message == "error") {
          setLoginError(true);
        } else if (res.data.message == "success") {
          StoreUser(res.data.user);
          dispatch({ type: "LOGGED", user: res.data.user });
          navigation.goBack();
        } else {
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <Input
              onChangeText={(e) => {
                setFirstName(e);
              }}
              value={FirstName}
              placeholder={"First Name"}
              leftIcon={<Icon name="vcard" size={30} color="#1CC5DC" />}
            />
            <Input
              onChangeText={(e) => {
                setLastName(e);
              }}
              value={LastName}
              placeholder="Last Name"
              leftIcon={<Icon name="vcard" size={30} color="#1CC5DC" />}
            />
            <Input
              onChangeText={(e) => {
                setLogin(e);
              }}
              value={Login}
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
                setTel(e);
              }}
              placeholder="Tel"
              value={Tel}
              leftIcon={<Icon name="phone" size={30} color="#1CC5DC" />}
            />
            <Input
              onChangeText={(e) => {
                setAdress(e);
              }}
              value={Adress}
              placeholder="Adress"
              leftIcon={<Icon name="map" size={30} color="#1CC5DC" />}
            />
            <Input
              onChangeText={(e) => {
                setPassword(e);
              }}
              secureTextEntry={true}
              placeholder="new Password"
              leftIcon={<Icon name="lock" size={30} color="#1CC5DC" />}
            />
            <Input
              onChangeText={(e) => {
                setEmail(e);
              }}
              value={Email}
              placeholder="Email"
              leftIcon={<Icon name="envelope" size={30} color="#1CC5DC" />}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              UpdateAction();
            }}
          >
            <View style={{ backgroundColor: "orange" }}>
              <Text
                style={{ color: "#FFF", textAlign: "center", fontSize: 35 }}
              >
                Update
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={{ backgroundColor: "#f00", marginTop: "10%" }}>
              <Text
                style={{ color: "#FFF", textAlign: "center", fontSize: 35 }}
              >
                Cancel
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
