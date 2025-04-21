import * as SecureStore from 'expo-secure-store';
import { RSSArticle } from '~/types';

export const storeArticles = async (key: string, articles: RSSArticle[]): Promise<void> => {
  await SecureStore.setItemAsync(key, JSON.stringify(articles));
};
