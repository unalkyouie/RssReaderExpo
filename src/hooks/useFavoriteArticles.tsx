import { useCallback, useEffect, useState } from 'react';
import { RSSArticle } from '~/types';
import { parseArticles } from '~/utils/parseArticles';
import { storeArticles } from '~/utils/storeArticles';

const FAVORITES_KEY = 'favorite_articles';

const useFavoriteArticles = () => {
  const [favorites, setFavorites] = useState<RSSArticle[]>([]);

  useEffect(() => {
    const stored = parseArticles(FAVORITES_KEY);
    setFavorites(stored);
  }, []);

  const toggleFavorite = useCallback((article: RSSArticle) => {
    const existing = parseArticles(FAVORITES_KEY);
    const exists = existing.find((a) => a.id === article.id);

    const updated = exists
      ? existing.filter((a) => a.id !== article.id)
      : [...existing, article];

    storeArticles(FAVORITES_KEY, updated);
    setFavorites(updated);
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((a) => a.id === id),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
};

export default useFavoriteArticles;
