import React, { useState, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import {
  Layout,
  Text,
  Input,
  Button,
  Card,
} from "@ui-kitten/components";
import { RootStackParamList } from "~/navigation/types";
import { useAddFeed, useEditFeed } from "~/hooks/useLocalFeeds";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { globalLayoutStyles } from "~/theme/layout";
import { globalFormStyles } from "~/theme/forms";

type Props = NativeStackScreenProps<RootStackParamList, "AddFeed">;

const AddFeedScreen = ({ navigation, route }: Props) => {
  const feedToEdit = route.params?.feed;
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const { mutate: addFeed } = useAddFeed();
  const { mutate: editFeed } = useEditFeed();

  useEffect(() => {
    if (feedToEdit) {
      setTitle(feedToEdit.title);
      setUrl(feedToEdit.url);
    }
  }, [feedToEdit]);

  const validateUrl = (input: string) => {
    try {
      const u = new URL(input);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSave = () => {
    if (!title.trim() || !url.trim()) {
      Alert.alert("Validation", "Both fields are required.");
      return;
    }
    if (!validateUrl(url)) {
      Alert.alert("Validation", "Please enter a valid URL.");
      return;
    }

    if (feedToEdit) {
      editFeed({ ...feedToEdit, title, url });
    } else {
      addFeed({ id: Math.random().toString(36).slice(2), title, url });
    }

    navigation.goBack();
  };

  return (
    <Layout style={globalLayoutStyles.screen}>
      <Card style={globalFormStyles.card}>
        <Text category="h5" style={globalFormStyles.title}>
          {feedToEdit ? "Edit Feed" : "Add Feed"}
        </Text>
        <Input
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={globalFormStyles.input}
        />
        <Input
          label="URL"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          keyboardType="url"
          style={globalFormStyles.input}
        />
        <Button onPress={handleSave} style={globalFormStyles.button}>
          Save
        </Button>
        <Button
          appearance="ghost"
          status="basic"
          onPress={() => navigation.goBack()}
          style={globalFormStyles.button}
        >
          Cancel
        </Button>
      </Card>
    </Layout>
  );
};

export default AddFeedScreen;
