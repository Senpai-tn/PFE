import axios from "axios";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Post from "../Components/Post";
import { API_URL } from "@env";

export default function Home() {
  const [Posts, setPosts] = useState([]);
  axios.get(API_URL + "/post", { params: {} }).then((res) => {
    setPosts(res.data);
    console.log("res");
  });

  return (
    <View>
      <ScrollView>
        {Posts.map((post, key) => {
          return <Post key={key} user={post} />;
        })}
      </ScrollView>
    </View>
  );
}
