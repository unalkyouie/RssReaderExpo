import { MMKV } from "react-native-mmkv";

import { RSSFeed } from "~/types";

export const storage = new MMKV({
  id: "rss-expo-app",
  encryptionKey: "rss-expo-app",
});

export const STORAGE_KEY_FEEDS = "rss_feeds";

export const getStoredFeeds = (): RSSFeed[] => {
  const raw = storage.getString(STORAGE_KEY_FEEDS);
  return raw ? JSON.parse(raw) : [];
};

export const saveFeeds = (feeds: RSSFeed[]) => {
  storage.set(STORAGE_KEY_FEEDS, JSON.stringify(feeds));
};

export const addFeed = (feed: RSSFeed) => {
  const feeds = getStoredFeeds();
  saveFeeds([...feeds, feed]);
};

export const editFeed = (id: string, updated: Partial<RSSFeed>) => {
  const feeds = getStoredFeeds().map((f) =>
    f.id === id ? { ...f, ...updated } : f,
  );
  saveFeeds(feeds);
};

export const deleteFeed = (id: string) => {
  const feeds = getStoredFeeds().filter((f) => f.id !== id);
  saveFeeds(feeds);
};
