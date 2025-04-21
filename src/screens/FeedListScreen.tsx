import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Feeds'>;

const FeedListScreen = ({ navigation }: Props) => {
  return (
    <View testID="feed-list-screen">
      <Text testID="feed-list-title">Your Feeds</Text>
      <Button
        testID="add-feed-button"
        title="Add Feed"
        onPress={() => navigation.navigate('AddFeed')}
      />
    </View>
  );
};

export default FeedListScreen;
