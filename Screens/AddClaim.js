import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { Input } from "react-native-elements/dist/input/Input";
import BottomBar from "../Components/BottomBar";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { API_URL } from "@env";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddClaim({ navigation }) {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.user);
  const [Description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModal, setinfoModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImages([...images, result.uri]);
    }
  };

  const UploadAction = async () => {
    const formData = new FormData();

    for (let index = 1; index <= images.length; index++) {
      const newImageUri =
        "file:///" + images[index - 1].split("file:/").join("");
      formData.append("file" + index, {
        uri: images[index - 1],
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });
      formData.append("user_id", user.id);
      formData.append("description", Description);
    }
    setModalVisible(true);
    axios
      .post(API_URL + "/claim/", formData)
      .then((res) => {
        console.log(images.length);
        if (res.data.message == "success") {
          setModalVisible(false);
          setinfoModal(true);
          setSuccess(true);
        } else {
          setModalVisible(false);
          setinfoModal(true);
          setSuccess(false);
        }
      })
      .catch((e) => {
        setModalVisible(false);
        setinfoModal(true);
        setSuccess(false);
      });
  };
  return (
    <View style={{ height: "100%" }}>
      <View>
        <View>
          <View style={{}}>
            <Input
              placeholder={"Title"}
              onChangeText={(e) => {
                setDescription(e);
              }}
            />
            <TouchableOpacity onPress={pickImage}>
              <View>
                <Text>Pick image</Text>
              </View>
            </TouchableOpacity>
            <View style={{ height: 100 }}></View>
            <Text>{images.length} images selected</Text>
          </View>
          <View style={{ height: 100 }}></View>
          <TouchableOpacity
            onPress={() => {
              UploadAction();
            }}
          >
            <Text>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 0 }}>
        <BottomBar navigation={navigation} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Image source={require("../assets/loading.gif")} />
      </Modal>

      {success ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={infoModal}
          onRequestClose={() => {
            setinfoModal(false);
          }}
        >
          <View style={styles.centeredView}>
            <Text style={{ color: "green", fontSize: 35 }}>Success</Text>
          </View>
        </Modal>
      ) : (
        <Modal
          animationType="slide"
          transparent={true}
          visible={infoModal}
          onRequestClose={() => {
            setinfoModal(false);
          }}
        >
          <View style={styles.centeredView}>
            <Text style={{ color: "red", fontSize: 35 }}>Error</Text>
          </View>
        </Modal>
      )}
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
