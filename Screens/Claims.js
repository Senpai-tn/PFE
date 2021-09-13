import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import BottomBar from "../Components/BottomBar";
import { API_URL } from "@env";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Claims({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [claims, setClaims] = useState([]);
  const [key, setKey] = useState(0);
  const [claim, setClaim] = useState({});
  const user = useSelector((state) => state.user);
  function CancelClaim(id, key) {
    console.log("Cancel");
    axios
      .put(API_URL + "/claim/", { id: id, state: "canceled" })
      .then((res) => {
        console.log(res.data);
        const newTodos = [...claims];
        newTodos[key] = res.data.claim;
        setClaims(newTodos);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  function GetClaims() {
    axios
      .get(API_URL + "/claim/", { params: { user_id: user.id } })
      .then((res) => {
        setClaims(res.data.claim);
      });
  }

  useEffect(() => {
    GetClaims();
    return () => {};
  }, []);
  return (
    <View style={{ height: "100%" }}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddClaim");
          }}
          style={{
            height: 50,
            width: "35%",
            top: 5,
            right: 0,
            position: "absolute",
            zIndex: 110,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Add a claim
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {claims.map((claim, key) => {
          return (
            <TouchableOpacity
              style={{ margin: 30 }}
              key={key}
              onLongPress={() => {
                if (claim.state != "sent") {
                  alert("not allowed");
                } else {
                  setModalVisible(true);
                  setClaim(claim);
                  setKey(key);
                }
              }}
            >
              <View>
                <View style={{}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  >
                    {claim.description}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={{
                      uri: API_URL + "/img/" + claim.images[0],
                    }}
                  />
                  <View>
                    {claim.state == "canceled" ? (
                      <Icon name={"times-circle"} size={75} color={"red"} />
                    ) : claim.state == "sent" ? (
                      <Icon name={"clock-o"} size={75} color={"orange"} />
                    ) : claim.state == "refused" ? (
                      <Icon name={"minus-circle"} size={75} color={"red"} />
                    ) : claim.state == "accepted" ? (
                      <Icon name={"check-circle-o"} size={75} color={"green"} />
                    ) : null}
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {claim.state}
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      {new Date(claim.created_at).getFullYear() +
                        "/" +
                        (new Date(claim.created_at).getMonth() + 1) +
                        "/" +
                        new Date(claim.created_at).getDate()}
                    </Text>
                    <Text>
                      {claim.state != "sent"
                        ? new Date(claim.updated_at).getFullYear() +
                          "/" +
                          (new Date(claim.updated_at).getMonth() + 1) +
                          "/" +
                          new Date(claim.updated_at).getDate()
                        : null}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0 }}>
        <BottomBar navigation={navigation} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Cancel {claim.description} ?</Text>
            <Text style={styles.modalText}>Are you sure ?</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 250,
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  CancelClaim(claim.id, key);
                }}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
