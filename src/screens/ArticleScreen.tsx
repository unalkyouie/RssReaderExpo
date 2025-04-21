import React from "react";
import {
  Layout,
  Text,
  Button,
  Icon,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import { RootStackParamList } from "~/navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useFavoriteArticles from "~/hooks/useFavoriteArticles";
import { WebView } from "react-native-webview";


type Props = NativeStackScreenProps<RootStackParamList, "Article">;

export const ArticleScreen = ({ navigation, route }: Props) => {
  const { url, title } = route.params;
  const { isFavorite, toggleFavorite } = useFavoriteArticles();

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 }}>
        <Text category="h6" style={{ flex: 1 }}>{title}</Text>
        <Icon
          name={isFavorite(url) ? "heart" : "heart-outline"}
          fill="red"
          style={{ width: 24, height: 24 }}
          onPress={() => toggleFavorite({ id: url, title, url, content: "", pubDate: "" })}
        />
      </Layout>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
      <Button onPress={() => navigation.goBack()} style={{ margin: 16 }}>
        Back
      </Button>
    </Layout>
  );
};


export default ArticleScreen;
