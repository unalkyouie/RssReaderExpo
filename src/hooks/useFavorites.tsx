import { useSyncExternalStore } from 'react';
import { RSSArticle } from '~/types';
import { parseArticles } from '~/utils/parseArticles';
import { subscribe } from '~/utils/subscribe';
import { storeArticles } from '~/utils/storeArticles';

const FAVORITES_KEY = 'favorite_articles';


export const useFavorites = () => {
    const favorites = useSyncExternalStore(subscribe, () => parseArticles(FAVORITES_KEY));
  
    const toggleFavorite = (article: RSSArticle) => {
      const existing = parseArticles(FAVORITES_KEY);
      const isFav = existing.find((a) => a.id === article.id);
      if (isFav) {
        storeArticles(FAVORITES_KEY, existing.filter((a) => a.id !== article.id));
      } else {
        storeArticles(FAVORITES_KEY, [...existing, article]);
      }
    };
  
    const isFavorite = (id: string) => favorites.some((a) => a.id === id);
  
    return { favorites, toggleFavorite, isFavorite };
  };
  