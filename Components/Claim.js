import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { API_URL } from "@env";
import axios from "axios";

export default function Claim(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const UpdateClaim = async (state) => {
    axios
      .put(API_URL + "/claim/", { id: props.claim.id, state: state })
      .then((res) => {
        console.log(res.data);
        if (res.data.message == "success") {
          setModalVisible(false);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("ClaimInfo", { claim: props.claim });
      }}
      onLongPress={() => {
        setModalVisible(true);
      }}
    >
      <View style={{ marginVertical: 25 }}>
        <Text style={{ fontSize: 25 }}>{props.claim.description}</Text>
        <Image
          source={{ uri: API_URL + "/img/" + props.claim.images[0] }}
          style={{ height: 150 }}
        />
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
            <Text style={styles.modalText}>Action for :</Text>
            <Text style={styles.modalText}>{props.claim.description}</Text>
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
                  UpdateClaim("refused");
                }}
              >
                <Text style={styles.textStyle}>Refuse</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => {
                  UpdateClaim("accepted");
                }}
              >
                <Text style={styles.textStyle}>Accept</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
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
    backgroundColor: "green",
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
    fontSize: 20,
    fontWeight: "bold",
  },
});
