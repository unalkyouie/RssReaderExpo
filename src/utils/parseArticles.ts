import * as SecureStore from 'expo-secure-store';
import { RSSArticle } from '~/types';

export const parseArticles = async (key: string): Promise<RSSArticle[]> => {
  const raw = await SecureStore.getItemAsync(key);
  return raw ? JSON.parse(raw) : [];
};