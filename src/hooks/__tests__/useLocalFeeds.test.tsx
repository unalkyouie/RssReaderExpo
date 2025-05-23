import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";

import { RSSFeed } from "~/types";
import { storage, STORAGE_KEY_FEEDS } from "~/utils/Storage";

import { useAddFeed, useDeleteFeed, useFeeds } from "../useLocalFeeds";

const createWrapper = () => {
  const client = new QueryClient();
  return ({ children }: any) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

describe("useLocalFeeds", () => {
  beforeEach(() => {
    storage.delete(STORAGE_KEY_FEEDS);
  });

  it("adds and reads feeds", async () => {
    const feed: RSSFeed = {
      id: "1",
      title: "My feed",
      url: "https://rss.com",
    };

    const { result: addResult } = renderHook(() => useAddFeed(), {
      wrapper: createWrapper(),
    });

    await addResult.current.mutateAsync(feed);

    const { result } = renderHook(() => useFeeds(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => !!result.current.data);
    expect(result.current.data).toEqual([feed]);
  });
});
