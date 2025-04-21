import { QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react-native";
import {
  mockedNavigationProps,
  MockedNavigator,
} from "jest/__mocks__/MockedNavigator.mock";
import { createQueryClient } from "jest/__mocks__/mockQueryClient";
import React from "react";

import FeedListScreen from "../FeedListScreen";

describe("FeedListScreen", () => {
  it("renders title and navigates to AddFeed", () => {
    const queryClient = createQueryClient();
    const { navigation, route } = mockedNavigationProps<"Feeds">(undefined);

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MockedNavigator>
          <FeedListScreen navigation={navigation} route={route} />
        </MockedNavigator>
      </QueryClientProvider>,
    );

    expect(getByTestId("feed-list-title").props.children).toBe(
      "Feed List Screen",
    );
    fireEvent.press(getByTestId("button-add-feed"));
    expect(navigation.navigate).toHaveBeenCalledWith("AddFeed");
  });
});
