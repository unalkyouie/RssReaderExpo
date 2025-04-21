import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';
import  useArticlesByFeedUrl  from '~/hooks/useArticlesByFeedUrl';
import { RSSArticle } from '~/types';

export type Props = NativeStackScreenProps<RootStackParamList, 'ArticleList'>;

const ArticleListScreen = ({ navigation, route }: Props) => {
  const { url, title } = route.params;
  const { data: articles, isLoading, isError } = useArticlesByFeedUrl(url);

  const handlePressArticle = (article: RSSArticle) => {
    navigation.navigate('Article', {
      title: article.title,
      url: article.url,
    });
  };

  return (
    <View testID="article-list-screen" style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />

      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Failed to fetch articles.</Text>}

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressArticle(item)}>
            <Text style={{ paddingVertical: 8 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ArticleListScreen;
