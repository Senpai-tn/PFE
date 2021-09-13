import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Navbar from "../Components/Navbar";
import { Input } from "react-native-elements/dist/input/Input";
import BottomBar from "../Components/BottomBar";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { API_URL } from "@env";
import axios from "axios";
import { useSelector } from "react-redux";
export default function AddPost({ navigation, route }) {
  const action = route.params.action;
  var TitleValue, DescriptionValue;
  if (action == "add") {
    DescriptionValue = "";
    TitleValue = "";
  } else {
    TitleValue = route.params.post.title;
    DescriptionValue = route.params.post.description;
  }
  const [Title, setTitle] = useState(TitleValue);
  const [Description, setDescription] = useState(DescriptionValue);
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

      formData.append("title", Title);
      formData.append("Description", Description);
    }

    if (action == "add") {
      axios
        .post(API_URL + "/post/", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.message == "success") {
            navigation.navigate("Posts");
          } else {
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else if (action == "update") {
      axios
        .put(API_URL + "/post/", {
          id: route.params.post.id,
          title: Title,
          description: Description,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.message == "success") {
            navigation.navigate("Posts");
          } else {
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  return (
    <View>
      <Navbar navigation={navigation} />
      <Text style={{ textAlign: "center", fontSize: 26, marginVertical: 30 }}>
        Add Post
      </Text>
      <View style={{ marginHorizontal: "10%" }}>
        <Input
          label={"Title"}
          onChangeText={(e) => {
            setTitle(e);
          }}
          value={Title}
        />
        <Input
          multiline={true}
          numberOfLines={4}
          label={"Description"}
          onChangeText={(e) => {
            setDescription(e);
          }}
          value={Description}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",

            height: 50,
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              UploadAction();
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              backgroundColor: "orange",
              height: 50,
              width: 150,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
