import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLocalFeeds } from '../useLocalFeeds';
import { act } from 'react-test-renderer';
import { RSSFeed } from '~/types';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
    queryClient,
  };
};

describe('useLocalFeeds', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('adds and reads feeds', async () => {
    const feed: RSSFeed = {
      id: '1',
      title: 'My feed',
      url: 'https://rss.com',
    };

    const { wrapper, queryClient } = createWrapper();

    const { result } = renderHook(() => useLocalFeeds(), { wrapper });

    await act(async () => {
      await result.current.addFeed(feed);
    });

    await waitFor(() => expect(result.current.feeds).toEqual([feed]));

    queryClient.clear();
  });
});
