import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View } from "react-native";

import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Feeds">;

export default function FeedListScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text testID="feed-list-title">Feed List Screen</Text>
      <Button
        title="Go to Add Feed"
        onPress={() => navigation.navigate("AddFeed")}
        testID="button-add-feed"
      />
    </View>
  );
}
