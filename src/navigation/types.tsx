import { RSSFeed } from "~/types";

export type RootStackParamList = {
  Feeds: undefined;
  AddFeed:  { feed?: RSSFeed };
  Article: {url: string; title: string  };
  ArticleList: {url: string; title: string, feedId: string }
};
