import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import Navbar from "../Components/Navbar";
import Role from "../Components/Role";
import { API_URL } from "@env";
import axios from "axios";
import { Input } from "react-native-elements";

export default function ListRoles({ navigation }) {
  const [Roles, setRoles] = useState([]);
  const [role, setRole] = useState({});
  const [type, setType] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const getRoles = () => {
    axios
      .get(API_URL + "/role/", { params: { deleted: "true" } })
      .then((res) => {
        if (res.data.message == "success") {
          setRoles(res.data.roles);
        }
      });
  };

  const AddRole = () => {
    axios.post(API_URL + "/role/", { type: type }).then((res) => {
      if (res.data.message == "success") {
        setRoles([...Roles, res.data.role]);
        setAddModalVisible(false);
      }
    });
  };

  const DeleteRole = () => {
    axios.delete(API_URL + "/role/", { data: { id: role.id } }).then((res) => {
      if (res.data.message == "success") {
        let filteredArray = Roles.filter((item) => item !== role);
        role.deleted_at = new Date();
        setRoles([...filteredArray, role]);
        setModalVisible(false);
      }
    });
  };

  useEffect(() => {
    getRoles();
    return () => {};
  }, []);
  return (
    <View>
      <Navbar navigation={navigation} />
      <View>
        <TouchableOpacity
          onPress={() => {
            setAddModalVisible(true);
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
            Add a role
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 35, textAlign: "center" }}>Roles : </Text>
      <ScrollView>
        {Roles.map((role, key) => {
          return role.deleted_at == null ? (
            <TouchableOpacity
              key={key}
              onLongPress={() => {
                setRole(role);
                setModalVisible(true);
              }}
            >
              <Role role={role} />
            </TouchableOpacity>
          ) : (
            <Role key={key} role={role} />
          );
        })}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input
              onChangeText={(e) => {
                setType(e);
              }}
              label={"Type"}
              style={{
                width: 100,
                borderWidth: 1,
                borderRadius: 35,
                paddingHorizontal: 30,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                AddRole();
              }}
            >
              <View>
                <Text>Add</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
            <Text style={styles.modalText}>Delet {role.type} ?</Text>
            <Text style={styles.modalText}>Are you sure ?</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 250,
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  DeleteRole();
                }}
              >
                <Text style={styles.textStyle}>Delete</Text>
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
    width: "80%",
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
