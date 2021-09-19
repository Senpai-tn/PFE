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
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import { Input } from "react-native-elements/dist/input/Input";
import BottomBar from "../Components/BottomBar";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { API_URL } from "@env";
import axios from "axios";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";

export default function AddClaim({ navigation }) {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.user);
  const [Description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModal, setinfoModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
      let statusLocation = await Location.requestForegroundPermissionsAsync();
      if (statusLocation !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getLastKnownPositionAsync({
        accuracy: 6,
      });
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
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
      formData.append("latitude", location.coords.latitude);
      formData.append("longitude", location.coords.longitude);
    }
    setModalVisible(true);
    axios
      .post(API_URL + "/claim/", formData)
      .then((res) => {
        console.log(res.data);
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
      <ScrollView>
        <View>
          <View style={{}}>
            <Text
              style={{
                color: "#000",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 50,
              }}
            >
              Description
            </Text>
            <Input
              placeholder={"Description"}
              numberOfLines={6}
              multiline={true}
              onChangeText={(e) => {
                setDescription(e);
              }}
            />
            <TouchableOpacity onPress={pickImage}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30%",
                  height: 50,
                  backgroundColor: "#555",
                  marginHorizontal: "35%",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                >
                  Pick image
                </Text>
              </View>
            </TouchableOpacity>
            <Text>{images.length} images selected</Text>
          </View>
          <View style={styles.container}>
            {location ? (
              <MapView
                style={styles.map}
                onLongPress={(e) => {
                  console.log(e.nativeEvent.coordinate);
                }}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.00422,
                  longitudeDelta: 0.00421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                ></Marker>
              </MapView>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() => {
              UploadAction();
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
              height: 50,
              backgroundColor: "green",
              marginHorizontal: "35%",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
              Upload
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  container: {
    marginVertical: "2.5%",
    marginBottom: 20,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#124578",
    padding: "5%",
  },
  map: {
    height: "100%",
    width: "100%",
  },
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
