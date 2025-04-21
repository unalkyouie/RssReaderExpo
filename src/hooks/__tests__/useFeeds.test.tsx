import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";
import { mockedFeeds } from "jest/__mocks__/entities";

import * as api from "~/api";

jest.spyOn(api, "fetchFeeds").mockResolvedValue(mockedFeeds);

import { useFeeds } from "../useFeeds";

describe("useFeeds", () => {
  it("fetches and returns feed data", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useFeeds(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockedFeeds);
    });
  });
});
