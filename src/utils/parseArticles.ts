import { RSSArticle } from "~/types";

import { storage } from "./Storage";

export const parseArticles = (key: string): RSSArticle[] => {
  const raw = storage.getString(key);
  return raw ? JSON.parse(raw) : [];
};
