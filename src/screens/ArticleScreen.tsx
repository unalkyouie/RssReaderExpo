import React from 'react';
import { View, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';
import useFavoriteArticles from '~/hooks/useFavoriteArticles';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Article'>;

const ArticleScreen = ({ navigation, route }: Props) => {
  const { url, title } = route.params;
  const { isFavorite, toggleFavorite } = useFavoriteArticles();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>{title}</Text>
        <Ionicons
          name={isFavorite(url) ? 'heart' : 'heart-outline'}
          size={24}
          color="red"
          onPress={() => toggleFavorite({ id: url, title, url, content: '', pubDate: '' })}
        />
      </View>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ArticleScreen;
