import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { storage, STORAGE_KEY_FEEDS } from '~/utils/Storage';
import { RSSFeed } from '~/types';

export const useFeeds = () => {
  return useQuery<RSSFeed[]>({
    queryKey: ['feeds'],
    queryFn: async () => {
      const raw = storage.getString(STORAGE_KEY_FEEDS);
      const favoritesFeed = {
        id: 'favorites',
        title: 'My Favorite Articles',
        url: '',
      };
      
      return [...(raw ? JSON.parse(raw) : []), favoritesFeed];    },
  });
};

export const useAddFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newFeed: RSSFeed) => {
      const raw = storage.getString(STORAGE_KEY_FEEDS);
      const feeds = raw ? JSON.parse(raw) : [];
      const updated = [...feeds, newFeed];
      storage.set(STORAGE_KEY_FEEDS, JSON.stringify(updated));
      return updated;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feeds'] }),
  });
};

export const useEditFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedFeed: RSSFeed) => {
      const raw = storage.getString(STORAGE_KEY_FEEDS);
      const feeds = raw ? JSON.parse(raw) : [];
      const updated = feeds.map((f: RSSFeed) =>
        f.id === updatedFeed.id ? updatedFeed : f
      );
      storage.set(STORAGE_KEY_FEEDS, JSON.stringify(updated));
      return updated;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feeds'] }),
  });
};

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (feedId: string) => {
      const raw = storage.getString(STORAGE_KEY_FEEDS);
      const feeds = raw ? JSON.parse(raw) : [];
      const updated = feeds.filter((f: RSSFeed) => f.id !== feedId);
      storage.set(STORAGE_KEY_FEEDS, JSON.stringify(updated));
      return updated;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feeds'] }),
  });
};
