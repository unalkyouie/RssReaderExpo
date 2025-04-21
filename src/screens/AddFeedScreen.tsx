import React, { useState, useEffect } from "react";
import { Alert  } from "react-native";
import {
  
  Layout,
  Text,
  Input,
  Button,
  
} from "@ui-kitten/components";


import { RootStackParamList } from "~/navigation/types";
import {  useAddFeed, useEditFeed } from "~/hooks/useLocalFeeds";
import { NativeStackScreenProps } from "@react-navigation/native-stack";



type Props = NativeStackScreenProps<RootStackParamList, "AddFeed">;

export const AddFeedScreen = ({ navigation, route }: Props) => {
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
    <Layout style={{ flex: 1, padding: 16 }}>
      <Text category="h5">{feedToEdit ? "Edit Feed" : "Add Feed"}</Text>
      <Input label="Title" value={title} onChangeText={setTitle} style={{ marginBottom: 12 }} />
      <Input label="URL" value={url} onChangeText={setUrl} autoCapitalize="none" keyboardType="url" style={{ marginBottom: 12 }} />
      <Button onPress={handleSave}>Save</Button>
      <Button appearance="ghost" status="basic" onPress={() => navigation.goBack()} style={{ marginTop: 8 }}>Cancel</Button>
    </Layout>
  );
};

export default AddFeedScreen;
