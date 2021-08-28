import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-elements/dist/buttons/Button";
import mime from "mime";
import axios from "axios";
import { API_URL } from "@env";
import BottomBar from "../Components/BottomBar";
export default function Upload({ navigation }) {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
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
    }
    await axios({
      url: "https://server-pfe.herokuapp.com/post/",
      data: formData,
      method: "POST",
    }).then((res) => {
      if (res.data.message == "Account Create ! You can now Login") {
        dispatch({ type: "REGISTER", state: { user: res.data.userdata } });
      } else {
        console.log("upload");
      }

      //
    });
  };
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Text></Text>
      <View style={{}}>
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
      <View style={{ position: "absolute", bottom: 0 }}>
        <BottomBar navigation={navigation} />
      </View>
    </View>
  );
}
