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

const withProxy = (url: string) =>
  `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

const useArticlesByFeedUrl = (url: string) => {
  return useQuery<RSSArticle[]>({
    queryKey: ['articles', url],
    enabled: !!url,
    queryFn: async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Fetch failed');
        const text = await res.text();
        return parseRssFeed(text);
      } catch (err) {
        const res = await fetch(withProxy(url));
        const text = await res.text();
        return parseRssFeed(text);
      }
    },
  });
};

export default useArticlesByFeedUrl;
