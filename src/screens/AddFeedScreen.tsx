import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';
import { useAddFeed, useEditFeed } from '~/hooks/useLocalFeeds';

type Props = NativeStackScreenProps<RootStackParamList, 'AddFeed'>;

const AddFeedScreen = ({ navigation, route }: Props) => {
  const feedToEdit = route.params?.feed;

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

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
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSave = () => {
    if (!title.trim() || !url.trim()) {
      Alert.alert('Validation', 'Both fields are required.');
      return;
    }

    if (!validateUrl(url)) {
      Alert.alert('Validation', 'Please enter a valid URL.');
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
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>
        {feedToEdit ? 'Edit Feed' : 'Add Feed'}
      </Text>

      <TextInput
        placeholder="Feed title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginBottom: 12,
        }}
      />
      <TextInput
        placeholder="Feed URL"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        keyboardType="url"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginBottom: 12,
        }}
      />

      <Button title="Save" onPress={handleSave} />
      <View style={{ height: 10 }} />
      <Button title="Cancel" color="gray" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddFeedScreen;
