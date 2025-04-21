import React from 'react';
import { View, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Article'>;

const ArticleScreen = ({ route, navigation }: Props) => {
  const { url, title } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 12, backgroundColor: '#f4f4f4' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>

      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        startInLoadingState
      />
    </View>
  );
};

export default ArticleScreen;
