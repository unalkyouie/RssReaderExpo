import React, { useState, useRef } from "react";
import {
  Layout,
  Text,
  Icon,
  Button,
  List,
  ListItem,
  Spinner,
  Card,
} from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity } from "react-native";

import { RootStackParamList } from "~/navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useArticlesByFeedUrl from "~/hooks/useArticlesByFeedUrl";
import useReadArticles from "~/hooks/useReadArticles";
import useFavoriteArticles from "~/hooks/useFavoriteArticles";
import { RSSArticle, RSSFeed } from "~/types";
import { globalLayoutStyles } from "~/theme/layout";

export type Props = NativeStackScreenProps<RootStackParamList, "ArticleList">;

const ArticleListScreen = ({ navigation, route }: Props) => {
  const { url, title, feedId } = route.params;
  const isFavoritesFeed = feedId === "favorites";
  const { markAsRead, isArticleRead } = useReadArticles();
  const { favorites, toggleFavorite, isFavorite } = useFavoriteArticles();

  const {
    data: fetchedArticles,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useArticlesByFeedUrl(url);

  const articles = isFavoritesFeed ? favorites : fetchedArticles;

  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const filteredArticles = showOnlyUnread
    ? articles?.filter((a) => !isArticleRead(a.id))
    : articles;

  const listRef = useRef<List<RSSArticle>>(null);

  return (
    <Layout style={globalLayoutStyles.screen}>
      <Card style={styles.card}>
        <Text category="h5" style={styles.titleOnly}>
          {title}
        </Text>

        <Button
          appearance={showOnlyUnread ? "filled" : "outline"}
          status="primary"
          size="small"
          onPress={() => setShowOnlyUnread((prev) => !prev)}
          style={styles.toggleButtonFull}
        >
          {showOnlyUnread ? "Show All" : "Show Unread"}
        </Button>

        {isLoading && !isFavoritesFeed && (
          <Spinner style={styles.spinner} />
        )}
        {isError && !isFavoritesFeed && (
          <Text status="danger">Failed to fetch articles.</Text>
        )}
      </Card>

      <List
        ref={listRef}
        data={filteredArticles}
        refreshing={isFetching}
        onRefresh={refetch}
        keyExtractor={(item, index) => item.id?.toString() || `article-${index}`}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            onPress={() => {
              navigation.navigate("Article", {
                title: item.title,
                url: item.url,
              });
              markAsRead(item);
            }}
            accessoryRight={() => (
              <TouchableOpacity
                onPress={() => toggleFavorite(item)}
                style={styles.favoriteButton}
              >
                <Icon
                  name={isFavorite(item.id) ? "heart" : "heart-outline"}
                  fill={isFavorite(item.id) ? "#c0392b" : "#ccc"}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            style={[
              styles.articleItem,
              isArticleRead(item.id) && styles.articleItemRead,
            ]}
          />
        )}
        style={styles.list}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  titleOnly: {
    marginBottom: 12,
    color: "#1e3c72",
    fontWeight: "bold",
  },
  toggleButtonFull: {
    marginBottom: 12,
    borderRadius: 12,
  },
  spinner: {
    alignSelf: "center",
  },
  list: {
    backgroundColor: "transparent",
  },
  articleItem: {
    borderRadius: 12,
    marginVertical: 6,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  articleItemRead: {
    opacity: 0.5,
  },
  favoriteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  icon: {
    width: 22,
    height: 22,
  },
});

export default ArticleListScreen;
