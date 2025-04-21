import { RSSArticle } from "~/types";

import { storage } from "./Storage";

export const storeArticles = (key: string, articles: RSSArticle[]) => {
  storage.set(key, JSON.stringify(articles));
};
