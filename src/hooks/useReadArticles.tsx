import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { RSSArticle } from "~/types";
import { parseArticles } from "~/utils/parseArticles";
import { storeArticles } from "~/utils/storeArticles";

const READ_KEY = "read_articles";

const useReadArticles = () => {
  const [read, setRead] = useState<RSSArticle[]>([]);

  useEffect(() => {
    const stored = parseArticles(READ_KEY);
    setRead(stored);
  }, []);
  const markAsRead = useCallback((article: RSSArticle) => {
    const existing = parseArticles(READ_KEY);
    if (!existing.find((a) => a.id === article.id)) {
      const updated = [...existing, article];
      storeArticles(READ_KEY, updated);
      setRead(updated);
    }
  }, []);

  const isArticleRead = useCallback(
    (id: string) => {
      return read.some((a) => a.id === id);
    },
    [read],
  );

  return { read, markAsRead, isArticleRead };
};

export default useReadArticles;
