import React from "react";
import { Alert } from "react-native";
import {
  Layout,
  Text,
  Button,
  List,
  ListItem,
} from "@ui-kitten/components";

import { RootStackParamList } from "~/navigation/types";
import { useFeeds,  useDeleteFeed } from "~/hooks/useLocalFeeds";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {  RSSFeed } from "~/types";


type Props = NativeStackScreenProps<RootStackParamList, 'Feeds'>;


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
    <Layout style={{ flex: 1, padding: 16 }}>
      <Text category="h5">Your Feeds</Text>
      <List
        data={allFeeds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            onPress={() => handleOpenFeed(item)}
            accessoryRight={() =>
              item.id !== "favorites" ? (
                <Layout style={{ flexDirection: "row" }}>
                  <Button size="tiny" onPress={() => handleEdit(item)} style={{ marginRight: 4 }}>Edit</Button>
                  <Button size="tiny" status="danger" onPress={() => handleDelete(item.id)}>Delete</Button>
                </Layout>
              ) : <Text></Text>
            }
          />
        )}
      />
      <Button onPress={() => navigation.navigate("AddFeed", { feed: undefined })} style={{ marginTop: 16 }}>
        Add Feed
      </Button>
    </Layout>
  );
};


export default FeedListScreen;
