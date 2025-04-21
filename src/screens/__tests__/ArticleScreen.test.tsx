import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import {
  mockedNavigationProps,
  MockedNavigator,
} from "jest/__mocks__/MockedNavigator.mock";
import { createQueryClient } from "jest/__mocks__/mockQueryClient";
import React from "react";

import ArticleScreen from "../ArticleScreen";

describe("ArticleScreen", () => {
  it("renders title and URL from route params", () => {
    const queryClient = createQueryClient();

    const { route } = mockedNavigationProps<"Article">({
      url: "https://test.com",
      title: "Test Title",
    });

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MockedNavigator>
          <ArticleScreen route={route} navigation={{} as any} />
        </MockedNavigator>
      </QueryClientProvider>,
    );

    expect(getByTestId("article-title").props.children).toBe("Test Title");
    expect(getByTestId("article-url").props.children).toBe("https://test.com");
  });
});
