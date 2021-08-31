import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Post from "../Components/Post";
import { API_URL } from "@env";
import BottomBar from "../Components/BottomBar";
import { useSelector } from "react-redux";

export default function Home({ navigation }) {
  const state = useSelector((state) => state);
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(API_URL + "/post").then((res) => {
      if (res.data.message == "success") setPosts(res.data.posts);
    });
    return () => {};
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <ScrollView>
        {Posts.map((post, key) => {
          return <Post key={key} post={post} />;
        })}
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0 }}>
        <BottomBar navigation={navigation} />
      </View>
    </View>
  );
}
