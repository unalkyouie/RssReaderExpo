import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";

import useArticlesByFeedUrl from "~/hooks/useArticlesByFeedUrl";
import useFavoriteArticles from "~/hooks/useFavoriteArticles";
import useReadArticles from "~/hooks/useReadArticles";
import { RootStackParamList } from "~/navigation/types";
import { RSSArticle } from "~/types";

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

  const handlePressArticle = (article: RSSArticle) => {
    navigation.navigate("Article", {
      title: article.title,
      url: article.url,
    });
    markAsRead(article);
  };

  const filteredArticles = showOnlyUnread
    ? articles?.filter((a) => !isArticleRead(a.id))
    : articles;

  const listRef = useRef<FlatList<RSSArticle>>(null);

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <View testID="article-list-screen" style={{ flex: 1, padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <Button
          title={showOnlyUnread ? "Show All" : "Show Unread"}
          onPress={() => setShowOnlyUnread((prev) => !prev)}
        />
      </View>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 }}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        {!isFavoritesFeed && <Button title="Scroll to Top" onPress={scrollToTop} />}
      </View>

      {isLoading && !isFavoritesFeed && <Text>Loading...</Text>}
      {isError && !isFavoritesFeed && <Text>Failed to fetch articles.</Text>}

      <FlatList
        ref={listRef}
        data={filteredArticles}
        onRefresh={refetch}
        refreshing={isFetching}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePressArticle(item)}
            style={{ opacity: isArticleRead(item.id) ? 0.5 : 1 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ paddingVertical: 8 }}>
                {item.title} {isFavorite(item.id) ? "⭐️" : ""}
              </Text>
              <Button
                title={isFavorite(item.id) ? "Unfav" : "Fav"}
                onPress={() => toggleFavorite(item)}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ArticleListScreen;
