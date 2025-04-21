import { useQuery } from '@tanstack/react-query';
import { RSSArticle } from '~/types';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

const parseRssFeed = (xmlText: string): RSSArticle[] => {
  const parsed = parser.parse(xmlText);
  const items = parsed?.rss?.channel?.item ?? [];

  return Array.isArray(items)
    ? items.map((item: any) => ({
        id: item.guid || item.link || Math.random().toString(),
        title: item.title || 'No title',
        url: item.link || '',
        content: item.description || '',
        pubDate: item.pubDate || new Date().toISOString(),
      }))
    : [];
};

const useArticlesByFeedUrl = (url: string) => {
  return useQuery<RSSArticle[]>({
    queryKey: ['articles', url],
    queryFn: async () => {
      const response = await fetch(url);
      const text = await response.text();
      return parseRssFeed(text);
    },
    enabled: !!url,
  });
};

export default useArticlesByFeedUrl;
