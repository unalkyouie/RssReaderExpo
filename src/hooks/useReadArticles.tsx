import { useSyncExternalStore } from 'react';
import { storage } from '~/utils/Storage';
import { RSSArticle } from '~/types';
import { subscribe } from '~/utils/subscribe';
import { parseArticles } from '~/utils/parseArticles';
import { storeArticles } from '~/utils/storeArticles';

const READ_KEY = 'read_articles';


const useReadArticles = () => {
  const read = useSyncExternalStore(subscribe, () => parseArticles(READ_KEY));

  const markAsRead = (article: RSSArticle) => {
    const existing = parseArticles(READ_KEY);
    if (!existing.find((a) => a.id === article.id)) {
      storeArticles(READ_KEY, [...existing, article]);
    }
  };

  return { read, markAsRead };
};

export default useReadArticles;