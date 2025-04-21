import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react-native";
import { mockedFeeds } from "jest/__mocks__/entities";
import {
  mockedNavigationProps,
  MockedNavigator,
} from "jest/__mocks__/MockedNavigator.mock";
import React from "react";

import { fetchFeeds } from "~/api";

import FeedListScreen from "../FeedListScreen";

jest.mock("~/api");
const mockedFetchFeeds = fetchFeeds as jest.MockedFunction<typeof fetchFeeds>;

describe("FeedListScreen", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  afterEach(() => {
    queryClient.clear();
  });
  it("renders title and feed list", async () => {
    mockedFetchFeeds.mockResolvedValue(mockedFeeds);
    const { navigation, route } = mockedNavigationProps<"Feeds">(undefined);

    const { findByText, findByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MockedNavigator>
          <FeedListScreen navigation={navigation} route={route} />
        </MockedNavigator>
      </QueryClientProvider>,
    );

    expect(await findByText("Your Feeds")).toBeTruthy();
    expect(await findByTestId("feed-item-1")).toBeTruthy();
    expect(await findByTestId("feed-item-2")).toBeTruthy();
  });

  it("navigates to AddFeed screen on button press", async () => {
    mockedFetchFeeds.mockResolvedValue([]);
    const { navigation, route } = mockedNavigationProps<"Feeds">(undefined);

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MockedNavigator>
          <FeedListScreen navigation={navigation} route={route} />
        </MockedNavigator>
      </QueryClientProvider>,
    );

    fireEvent.press(getByTestId("add-feed-button"));

    expect(navigation.navigate).toHaveBeenCalledWith("AddFeed");
  });
});
