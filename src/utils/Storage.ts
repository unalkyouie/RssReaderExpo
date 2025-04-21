import * as SecureStore from 'expo-secure-store';
import { RSSFeed } from '~/types';

export const STORAGE_KEY_FEEDS = 'rss_feeds';

export const getStoredFeeds = async (): Promise<RSSFeed[]> => {
  const raw = await SecureStore.getItemAsync(STORAGE_KEY_FEEDS);
  return raw ? JSON.parse(raw) : [];
};

export const saveFeeds = async (feeds: RSSFeed[]) => {
  await SecureStore.setItemAsync(STORAGE_KEY_FEEDS, JSON.stringify(feeds));
};

export const addFeed = async (feed: RSSFeed) => {
  const feeds = await getStoredFeeds();
  await saveFeeds([...feeds, feed]);
};

export const editFeed = async (id: string, updated: Partial<RSSFeed>) => {
  const feeds = await getStoredFeeds();
  const updatedFeeds = feeds.map((f) =>
    f.id === id ? { ...f, ...updated } : f
  );
  await saveFeeds(updatedFeeds);
};

export const deleteFeed = async (id: string) => {
  const feeds = await getStoredFeeds();
  const updatedFeeds = feeds.filter((f) => f.id !== id);
  await saveFeeds(updatedFeeds);
};
