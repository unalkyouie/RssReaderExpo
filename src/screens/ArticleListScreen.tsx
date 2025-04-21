import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';
import useArticlesByFeedUrl from '~/hooks/useArticlesByFeedUrl';
import { RSSArticle } from '~/types';
import useReadArticles from '~/hooks/useReadArticles';
import useFavoriteArticles from '~/hooks/useFavoriteArticles';

export type Props = NativeStackScreenProps<RootStackParamList, 'ArticleList'>;

const ArticleListScreen = ({ navigation, route }: Props) => {
  const { url, title, feedId } = route.params;
  const isFavoritesFeed = feedId === 'favorites';

  const { markAsRead, isArticleRead } = useReadArticles();
  const { favorites, toggleFavorite, isFavorite } = useFavoriteArticles();

  const { data: fetchedArticles, isLoading, isError } = useArticlesByFeedUrl(url);
  const articles = isFavoritesFeed ? favorites : fetchedArticles;

  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  const handlePressArticle = (article: RSSArticle) => {
    navigation.navigate('Article', {
      title: article.title,
      url: article.url,
    });
    markAsRead(article);
  };

  const filteredArticles = showOnlyUnread
    ? articles?.filter((a) => !isArticleRead(a.id))
    : articles;

  return (
    <View testID="article-list-screen" style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
        <Button
          title={showOnlyUnread ? 'Show All' : 'Show Unread'}
          onPress={() => setShowOnlyUnread((prev) => !prev)}
        />
      </View>

      <Button title="Back" onPress={() => navigation.goBack()} />

      {isLoading && !isFavoritesFeed && <Text>Loading...</Text>}
      {isError && !isFavoritesFeed && <Text>Failed to fetch articles.</Text>}

      <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePressArticle(item)}
            style={{ opacity: isArticleRead(item.id) ? 0.5 : 1 }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ paddingVertical: 8 }}>
                {item.title} {isFavorite(item.id) ? '⭐️' : ''}
              </Text>
              <Button
                title={isFavorite(item.id) ? 'Unfav' : 'Fav'}
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
