import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import BottomBar from "../Components/BottomBar";
import Navbar from "../Components/Navbar";
import { API_URL } from "@env";

export default function PostInfo({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [Exist, setExist] = useState(route.params.post.deleted_at == null);
  const user = useSelector((state) => state.user);
  const Update = () => {
    axios
      .put(API_URL + "/post/", {
        id: route.params.post.id,
        title: route.params.post.title + " " + new Date(),
        description: route.params.post.description + " " + new Date(),
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  const DeletePost = () => {
    console.log("Delete");
    axios
      .delete(API_URL + "/post/", { data: { id: route.params.post.id } })
      .then((res) => {
        console.log(res.data);
        if (res.data.message == "success") setExist(false);
      });
  };

  return (
    <View style={{ height: "100%" }}>
      <Navbar navigation={navigation} />
      <ScrollView>
        <Image
          source={{
            uri:
              "http://server-pfe.herokuapp.com/img/" +
              route.params.post.images[0],
          }}
          style={{
            height: 300,
            width: "100%",
            margin: 0,
          }}
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: 10,
            position: "relative",
            top: 0,
            marginBottom: 0,
          }}
        >
          {route.params.post.images.map((img, key) => {
            if (key != 0) {
              return (
                <View key={key}>
                  <Image
                    source={{
                      uri: "http://server-pfe.herokuapp.com/img/" + img,
                    }}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 20,
                      marginHorizontal: 5,
                    }}
                  />
                </View>
              );
            }
          })}
        </ScrollView>
        <View
          style={{
            position: "relative",
            top: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {route.params.post.title}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 35,
            width: "100%",
            position: "relative",
            top: 0,
            marginTop: 30,
          }}
        >
          <Text style={{ fontSize: 20, opacity: 0.5 }}>
            {route.params.post.description}
          </Text>
        </View>
        {user.roles.includes("ADMIN") || user.roles.includes("POST_MANAGER") ? (
          <View
            style={{
              height: 100,
              width: "100%",
              marginVertical: 100,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddPost", {
                  action: "update",
                  post: route.params.post,
                });
              }}
              style={{
                backgroundColor: "orange",
                height: 60,
                width: 130,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 19 }}>
                Update
              </Text>
            </TouchableOpacity>
            {Exist ? (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  backgroundColor: "red",
                  height: 60,
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 130,
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 19 }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
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
            <Text style={styles.modalText}>
              Delete {route.params.post.description} ?
            </Text>
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
                  DeletePost();
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
