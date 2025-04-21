import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";

import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Article">;

export default function ArticleScreen({ route }: Props) {
  const { url, title } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text testID="article-title">{title || "Article"}</Text>
      <Text testID="article-url">{url}</Text>
    </View>
  );
}
