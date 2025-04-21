import { useCallback, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { RSSArticle } from '~/types';

const READ_KEY = 'read_articles';

const useReadArticles = () => {
  const [read, setRead] = useState<RSSArticle[]>([]);

  useEffect(() => {
    const loadRead = async () => {
      const raw = await SecureStore.getItemAsync(READ_KEY);
      const parsed: RSSArticle[] = raw ? JSON.parse(raw) : [];
      setRead(parsed);
    };

    loadRead();
  }, []);

  const saveRead = async (articles: RSSArticle[]) => {
    await SecureStore.setItemAsync(READ_KEY, JSON.stringify(articles));
    setRead(articles);
  };

  const markAsRead = useCallback(async (article: RSSArticle) => {
    const raw = await SecureStore.getItemAsync(READ_KEY);
    const existing: RSSArticle[] = raw ? JSON.parse(raw) : [];

    if (!existing.find((a) => a.id === article.id)) {
      const updated = [...existing, article];
      await saveRead(updated);
    }
  }, []);

  const isArticleRead = useCallback(
    (id: string) => read.some((a) => a.id === id),
    [read]
  );

  return { read, markAsRead, isArticleRead };
};

export default useReadArticles;
