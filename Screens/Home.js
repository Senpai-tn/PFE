import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Post from "../Components/Post";
import { API_URL } from "@env";
import BottomBar from "../Components/BottomBar";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";

export default function Home({ navigation }) {
  const [Posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user);
  function getPosts() {
    axios.get(API_URL + "/post/").then((res) => {
      if (res.data.message == "success") {
        setPosts(res.data.posts);
      }
    });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getPosts();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ height: "100%" }}>
      <Navbar navigation={navigation} />
      {user.roles.includes("ADMIN") ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddPost", { action: "add" });
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
              Add a post
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <ScrollView>
        {Posts.map((post, key) => {
          if (post.deleted_at == null && !user.roles.includes("ADMIN")) {
            return <Post key={key} post={post} navigation={navigation} />;
          } else if (user.roles.includes("ADMIN")) {
            return <Post key={key} post={post} navigation={navigation} />;
          }
        })}
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0 }}>
        <BottomBar navigation={navigation} />
      </View>
    </View>
  );
}
