import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';
import { useAddFeed } from '~/hooks/useLocalFeeds';
import { RSSFeed } from '~/types';
import { nanoid } from 'nanoid/non-secure';

type Props = NativeStackScreenProps<RootStackParamList, 'AddFeed'>;

const AddFeedScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { mutate } = useAddFeed();

  const handleAdd = () => {
    const newFeed: RSSFeed = { id: nanoid(), title, url };
    mutate(newFeed, {
      onSuccess: () => navigation.goBack(),
    });
  };

  return (
    <View>
      <Text>Add Feed</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        testID="feed-title-input"
      />
      <TextInput
        placeholder="URL"
        value={url}
        onChangeText={setUrl}
        testID="feed-url-input"
      />
      <Button title="Save" onPress={handleAdd} testID="feed-save-button" />
    </View>
  );
};

export default AddFeedScreen;
