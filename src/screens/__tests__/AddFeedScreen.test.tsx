import { QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react-native";
import {
  mockedNavigationProps,
  MockedNavigator,
} from "jest/__mocks__/MockedNavigator.mock";
import { createQueryClient } from "jest/__mocks__/mockQueryClient";
import React from "react";

import AddFeedScreen from "../AddFeedScreen";

describe("AddFeedScreen", () => {
  it("renders title and navigates to Article with params", () => {
    const queryClient = createQueryClient();
    const { navigation, route } = mockedNavigationProps<"AddFeed">(undefined);

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MockedNavigator>
          <AddFeedScreen navigation={navigation} route={route} />
        </MockedNavigator>
      </QueryClientProvider>,
    );

    expect(getByTestId("add-feed-title").props.children).toBe(
      "Add Feed Screen",
    );
    fireEvent.press(getByTestId("button-view-article"));
    expect(navigation.navigate).toHaveBeenCalledWith("Article", {
      url: "https://example.com",
      title: "Example",
    });
  });
});
