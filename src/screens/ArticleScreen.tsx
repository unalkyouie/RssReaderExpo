import React from "react";
import {
  Layout,
  Text,
  Button,
  Icon,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "~/navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useFavoriteArticles from "~/hooks/useFavoriteArticles";
import { WebView } from "react-native-webview";

export type Props = NativeStackScreenProps<RootStackParamList, "Article">;

const ArticleScreen = ({ navigation, route }: Props) => {
  const { url, title } = route.params;
  const { isFavorite, toggleFavorite } = useFavoriteArticles();

  return (
    <Layout style={styles.container}>
      <Layout style={styles.header}>
        <Text category="h6" style={styles.title}>
          {title}
        </Text>
        <Icon
          name={isFavorite(url) ? "heart" : "heart-outline"}
          fill="#e91e63"
          style={styles.icon}
          onPress={() =>
            toggleFavorite({ id: url, title, url, content: "", pubDate: "" })
          }
        />
      </Layout>
      <WebView source={{ uri: url }} style={styles.webview} />
      <Button onPress={() => navigation.goBack()} style={styles.backButton}>
        Back
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    color: "#34495e",
  },
  icon: {
    width: 24,
    height: 24,
  },
  webview: {
    flex: 1,
  },
  backButton: {
    margin: 16,
    borderRadius: 12,
  },
});

export default ArticleScreen;