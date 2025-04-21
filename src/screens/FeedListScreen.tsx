import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";

import { useFeeds } from "~/hooks/useLocalFeeds";

import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Feeds">;

const FeedListScreen = ({ navigation }: Props) => {
  const { data: feeds = [] } = useFeeds();

  const handlePressFeed = (feed: any) => {
    navigation.navigate("Article", {
      url: feed.url,
      title: feed.title,
    });
  };

  return (
    <View testID="feed-list-screen">
      <Text testID="feed-list-title">Your Feeds</Text>
      <Button
        testID="add-feed-button"
        title="Add Feed"
        onPress={() => navigation.navigate("AddFeed")}
      />
      <FlatList
        testID="feed-list"
        data={feeds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePressFeed(item)}
            testID={`feed-item-${item.id}`}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FeedListScreen;
