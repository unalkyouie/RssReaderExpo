import React from "react";
import { Alert, StyleSheet } from "react-native";
import {
  Layout,
  Text,
  Button,
  List,
  ListItem,
  Card,
  Icon,
} from "@ui-kitten/components";

import { RootStackParamList } from "~/navigation/types";
import { useFeeds, useDeleteFeed } from "~/hooks/useLocalFeeds";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RSSFeed } from "~/types";
import { globalLayoutStyles } from "~/theme/layout";
import { Swipeable } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, "Feeds">;

const TrashIcon = (props: any) => <Icon {...props} name="trash-outline"   style={styles.icon}/>;
const EditIcon = (props: any) => <Icon {...props} name="edit-outline"  style={styles.icon}/>;

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
    ...feeds,
  ];

  const renderRightActions = (feed: RSSFeed) => (
    <Layout style={styles.swipeActionsRight}>
      <Button
        size="tiny"
        status="danger"
        accessoryLeft={TrashIcon}
        onPress={() => handleDelete(feed.id)}
        style={styles.swipeButton}
      />
    </Layout>
  );

  const renderLeftActions = (feed: RSSFeed) => (
    <Layout style={styles.swipeActionsLeft}>
      <Button
        size="tiny"
        status="primary"
        accessoryLeft={EditIcon}
        onPress={() => handleEdit(feed)}
        style={styles.swipeButton}
      />
    </Layout>
  );

  const renderItem = ({ item }: { item: RSSFeed }) => (
    <Swipeable
      renderRightActions={
        item.id !== "favorites" ? () => renderRightActions(item) : undefined
      }
      renderLeftActions={
        item.id !== "favorites" ? () => renderLeftActions(item) : undefined
      }
    >
      <ListItem
        title={() => <Text style={styles.listItemTitleText}>{item.title}</Text>}
        onPress={() => handleOpenFeed(item)}
        accessoryRight={
          item.id !== "favorites"
            ? () => (
                <Button
                  size="tiny"
                  appearance="ghost"
                  accessoryLeft={TrashIcon}
                  onPress={() => handleDelete(item.id)}
                  style={styles.icon}
                />
              )
            : undefined
        }
        accessoryLeft={
          item.id !== "favorites"
            ? () => (
                <Button
                  size="tiny"
                  appearance="ghost"
                  accessoryLeft={EditIcon}
                  onPress={() => handleEdit(item)}
                  style={styles.icon}
                />
              )
            : undefined
        }
        style={styles.listItem}
      />
    </Swipeable>
  );

  return (
    <Layout style={globalLayoutStyles.screen}>
      <Card style={styles.card}>
        <Text category="h5" style={styles.heading}>Your Feeds</Text>
      </Card>

      <List
        data={allFeeds}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />

      <Button
        onPress={() => navigation.navigate("AddFeed", { feed: undefined })}
        style={styles.bottomAddBtn}
      >
        Add Feed
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 16,
  },
  heading: {
    marginBottom: 12,
    color: "#1e3c72",
    fontWeight: "bold",
  },
  list: {
    backgroundColor: "transparent",
  },
  listItem: {
    borderRadius: 20,
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e0e0e0",
    borderWidth: 1,
    overflow: "hidden",
    minHeight: 100,
  },
  listItemTitleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e3c72",
  },
  iconBtn: {
    padding: 4,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#1e3c72",
  },
  swipeActionsRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    backgroundColor: "transparent"
  },
  swipeActionsLeft: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    backgroundColor: "transparent"
  },
  swipeButton: {
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomAddBtn: {
    marginTop: 24,
    borderRadius: 12,
  },
});



export default FeedListScreen;
