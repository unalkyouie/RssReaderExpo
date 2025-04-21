import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { RSSFeed } from '~/types';

export const STORAGE_KEY_FEEDS = 'rss_feeds';

const FAVORITES_FEED: RSSFeed = {
  id: 'favorites',
  title: 'My Favorite Articles',
  url: '',
};

const loadFeedsWithFavorites = async (): Promise<RSSFeed[]> => {
  const raw = await SecureStore.getItemAsync(STORAGE_KEY_FEEDS);
  const feeds: RSSFeed[] = raw ? JSON.parse(raw) : [];
  const hasFavorites = feeds.some((f) => f.id === FAVORITES_FEED.id);

  return hasFavorites ? feeds : [...feeds, FAVORITES_FEED];
};

const saveFeeds = async (feeds: RSSFeed[]) => {
  await SecureStore.setItemAsync(STORAGE_KEY_FEEDS, JSON.stringify(feeds));
};

export const useFeeds = () => {
  return useQuery<RSSFeed[]>({
    queryKey: ['feeds'],
    queryFn: loadFeedsWithFavorites,
  });
};

export const useAddFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newFeed: RSSFeed) => {
      const feeds = (await loadFeedsWithFavorites()).filter(
        (f) => f.id !== FAVORITES_FEED.id
      );
      const updated = [...feeds, newFeed];
      await saveFeeds(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });
};

export const useEditFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedFeed: RSSFeed) => {
      const feeds = (await loadFeedsWithFavorites()).filter(
        (f) => f.id !== FAVORITES_FEED.id
      );
      const updated = feeds.map((f) =>
        f.id === updatedFeed.id ? updatedFeed : f
      );
      await saveFeeds(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });
};

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (feedId: string) => {
      const feeds = (await loadFeedsWithFavorites()).filter(
        (f) => f.id !== feedId && f.id !== FAVORITES_FEED.id
      );
      await saveFeeds(feeds);
      return feeds;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });
};
