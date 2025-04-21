import { useQuery } from '@tanstack/react-query';
import Parser from 'rss-parser';
import { RSSArticle } from '~/types';

const parser = new Parser();

 const useArticlesByFeedUrl = (url: string) => {
  return useQuery<RSSArticle[]>({
    queryKey: ['articles', url],
    queryFn: async () => {
        try {
          const feed = await parser.parseURL(url);
          return feed.items.map((item) => ({
            id: item.guid || item.link || Math.random().toString(),
            title: item.title || 'No title',
            url: item.link || '',
            content: item.contentSnippet || '',
            pubDate: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString()
        }));
        } catch (error) {
          console.warn('Failed to fetch feed:', error);
          return [];
        }
        
      },
    enabled: !!url,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
  });
};

export default useArticlesByFeedUrl;