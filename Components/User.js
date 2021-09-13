import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { API_URL } from "@env";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

export default function User(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [User, setUser] = useState(props.user);

  const BlockUser = () => {
    axios.delete(API_URL + "/delete", { data: { id: User.id } }).then((res) => {
      setModalVisible(false);
      setUser(res.data.user);
      console.log(res.data);
    });
  };
  const SetRole = () => {
    var action = "";
    if (User.roles.includes("ADMIN")) {
      action = "remove";
    } else {
      action = "add";
    }
    axios
      .post(API_URL + "/setRole", {
        id: User.id,
        type: "ADMIN",
        action: action,
      })
      .then((res) => {
        setModalVisible(false);
        setUser(res.data.user);
      });
  };

  return (
    <TouchableOpacity
      onLongPress={() => {
        setModalVisible(true);
      }}
      style={{
        backgroundColor: User.roles.includes("ADMIN") ? "green" : "grey",
        marginVertical: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          borderStyle: "dashed",
          borderWidth: 1,
          margin: 10,
        }}
      >
        {User.deleted_at != null ? (
          <Icon size={25} name={"trash"} color={"red"} />
        ) : null}
        <Text style={styles.header}>{User.id}</Text>
        <Text style={styles.header}>{User.login}</Text>
        <Text style={styles.header}>{User.firstName}</Text>
        <Text style={styles.header}>{User.lastName}</Text>
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
            <Text style={styles.modalText}>{User.login}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 250,
              }}
            >
              {User.deleted_at == null ? (
                <>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      BlockUser();
                    }}
                  >
                    <Text style={styles.textStyle}>Block</Text>
                  </Pressable>
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      SetRole();
                    }}
                  >
                    <Text style={styles.textStyle}>
                      {User.roles.includes("ADMIN") ? "Dispromote" : "Promote"}
                    </Text>
                  </Pressable>
                </>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: { color: "#000", fontWeight: "bold", fontSize: 18 },
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
