import { RSSFeed, RSSArticle } from '~/types/index';

export const mockedFeed: RSSFeed = {
  id: '1',
  title: 'Mocked Feed',
  url: 'https://mocked-feed.com/rss',
};

export const mockedFeeds: Array<RSSFeed> = [
  mockedFeed,
  {
    id: '2',
    title: 'Another Feed',
    url: 'https://another.com/rss',
  },
];

export const mockedArticle: RSSArticle = {
  id: 'a1',
  title: 'Mocked Article',
  url: 'https://mocked-article.com',
  content: 'This is a test article content.',
  pubDate: '2025-04-21T10:00:00Z',
};

export const mockedArticles: Array<RSSArticle> = [
  mockedArticle,
  {
    id: 'a2',
    title: 'Another Article',
    url: 'https://another.com/article',
    content: 'Second test article.',
    pubDate: '2025-04-20T12:00:00Z',
  },
];
