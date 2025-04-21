import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View } from "react-native";

import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "AddFeed">;

export default function AddFeedScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text testID="add-feed-title">Add Feed Screen</Text>
      <Button
        title="Go to Article"
        onPress={() =>
          navigation.navigate("Article", {
            url: "https://example.com",
            title: "Example",
          })
        }
        testID="button-view-article"
      />
    </View>
  );
}
