import { useCallback, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { RSSArticle } from '~/types';

const FAVORITES_KEY = 'favorite_articles';

const useFavoriteArticles = () => {
  const [favorites, setFavorites] = useState<RSSArticle[]>([]);

  
  useEffect(() => {
    const loadFavorites = async () => {
      const raw = await SecureStore.getItemAsync(FAVORITES_KEY);
      const parsed: RSSArticle[] = raw ? JSON.parse(raw) : [];
      setFavorites(parsed);
    };

    loadFavorites();
  }, []);

  const saveFavorites = async (articles: RSSArticle[]) => {
    await SecureStore.setItemAsync(FAVORITES_KEY, JSON.stringify(articles));
    setFavorites(articles);
  };

  const toggleFavorite = useCallback(async (article: RSSArticle) => {
    const raw = await SecureStore.getItemAsync(FAVORITES_KEY);
    const existing: RSSArticle[] = raw ? JSON.parse(raw) : [];

    const exists = existing.find((a) => a.id === article.id);
    const updated = exists
      ? existing.filter((a) => a.id !== article.id)
      : [...existing, article];

    await saveFavorites(updated);
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((a) => a.id === id),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
};

export default useFavoriteArticles;
