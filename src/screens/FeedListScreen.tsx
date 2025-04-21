import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Alert,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useDeleteFeed, useFeeds } from "~/hooks/useLocalFeeds";
import { RootStackParamList } from "~/navigation/types";
import { RSSFeed } from "~/types";

type Props = NativeStackScreenProps<RootStackParamList, "Feeds">;

const FeedListScreen = ({ navigation }: Props) => {
  const { data: feeds = [] } = useFeeds();
  const deleteFeed = useDeleteFeed();

  const handleDelete = (id: string) => {
    Alert.alert("Delete Feed", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteFeed.mutate(id),
      },
    ]);
  };

  const handleEdit = (feed: RSSFeed) => {
    navigation.navigate("AddFeed", { feed });
  };

  const handleOpenFeed = (feed: RSSFeed) => {
    navigation.navigate("ArticleList", {
      title: feed.title,
      url: feed.url,
      feedId: feed.id,
    });
  };

  const allFeeds: RSSFeed[] = [
    {
      id: "favorites",
      title: "⭐️ My Favorite Articles",
      url: "",
    },
    ...feeds,
  ];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Feeds</Text>

      <FlatList
        data={allFeeds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOpenFeed(item)}
            style={{
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderColor: "#ccc",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            testID={`feed-item-${item.id}`}
          >
            <Text>{item.title}</Text>
            {item.id !== "favorites" && (
              <View style={{ flexDirection: "row" }}>
                <Button title="Edit" onPress={() => handleEdit(item)} />
                <Button title="Delete" onPress={() => handleDelete(item.id)} />
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      <Button
        testID="add-feed-button"
        title="Add Feed"
        onPress={() => navigation.navigate("AddFeed", { feed: undefined })}
      />
    </View>
  );
};

export default FeedListScreen;
