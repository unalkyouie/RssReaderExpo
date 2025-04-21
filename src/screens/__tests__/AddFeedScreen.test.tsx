import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddFeedScreen from '../AddFeedScreen';
import { MockedNavigator, mockedNavigationProps } from 'jest/__mocks__/MockedNavigator.mock';

const createWrapper = (children: React.ReactNode) => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <MockedNavigator>{children}</MockedNavigator>
    </QueryClientProvider>
  );
};

describe('AddFeedScreen', () => {
  it('adds feed and navigates back', () => {
    const { navigation, route } = mockedNavigationProps<'AddFeed'>({});
    const { getByTestId } = render(
      createWrapper(<AddFeedScreen navigation={navigation} route={route} />)
    );

    fireEvent.changeText(getByTestId('feed-title-input'), 'Test Feed');
    fireEvent.changeText(getByTestId('feed-url-input'), 'https://test.com');
    fireEvent.press(getByTestId('feed-save-button'));

    expect(navigation.goBack).toHaveBeenCalled();
  });
});
