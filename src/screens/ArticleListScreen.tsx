import React, { useState,  useRef } from "react";
import {
  Layout,
  Text,
  Button,
  List,
  ListItem,
  Toggle,
} from "@ui-kitten/components";


import { RootStackParamList } from "~/navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useArticlesByFeedUrl from "~/hooks/useArticlesByFeedUrl";
import useReadArticles from "~/hooks/useReadArticles";
import useFavoriteArticles from "~/hooks/useFavoriteArticles";
import { RSSArticle, RSSFeed } from "~/types";

export type Props = NativeStackScreenProps<RootStackParamList, "ArticleList">;

const ArticleListScreen = ({ navigation, route }: Props) => {
  const { url, title, feedId } = route.params;
  const isFavoritesFeed = feedId === "favorites";
  const { markAsRead, isArticleRead } = useReadArticles();
  const { favorites, toggleFavorite, isFavorite } = useFavoriteArticles();

  const { data: fetchedArticles, refetch, isFetching } = useArticlesByFeedUrl(url);
  const articles = isFavoritesFeed ? favorites : fetchedArticles;

  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const filteredArticles = showOnlyUnread ? articles?.filter((a) => !isArticleRead(a.id)) : articles;

  const listRef = useRef<List<RSSArticle>>(null);
  const scrollToTop = () => listRef.current?.scrollToOffset({ animated: true, offset: 0 });

  return (
    <Layout style={{ flex: 1, padding: 16 }}>
      <Text category="h5">{title}</Text>
      <Toggle
        checked={showOnlyUnread}
        onChange={setShowOnlyUnread}
        style={{ marginVertical: 8 }}
      >
        {showOnlyUnread ? "Show All" : "Show Unread"}
      </Toggle>

      {!isFavoritesFeed && (
        <Button onPress={scrollToTop} style={{ marginBottom: 8 }}>
          Scroll to Top
        </Button>
      )}

      <List
        ref={listRef}
        data={filteredArticles}
        refreshing={isFetching}
        onRefresh={refetch}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem
            title={`${item.title} ${isFavorite(item.id) ? "⭐️" : ""}`}
            onPress={() => {
              navigation.navigate("Article", { title: item.title, url: item.url });
              markAsRead(item);
            }}
            accessoryRight={() => (
              <Button
                size="tiny"
                appearance="outline"
                status={isFavorite(item.id) ? "danger" : "success"}
                onPress={() => toggleFavorite(item)}
              >
                {isFavorite(item.id) ? "Unfav" : "Fav"}
              </Button>
            )}
          />
        )}
      />
    </Layout>
  );
};

export default ArticleListScreen;
