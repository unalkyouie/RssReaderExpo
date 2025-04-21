import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import FeedListScreen from '../FeedListScreen';
import { createQueryClient } from 'jest/__mocks__/mockQueryClient';
import { MockedNavigator, mockedNavigationProps } from 'jest/__mocks__/MockedNavigator.mock';

describe('FeedListScreen', () => {
  it('renders title and navigates to AddFeed', () => {
    const queryClient = createQueryClient();
    const { navigation, route } = mockedNavigationProps<'Feeds'>(undefined);

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MockedNavigator>
          <FeedListScreen navigation={navigation} route={route} />
        </MockedNavigator>
      </QueryClientProvider>
    );

    expect(getByTestId('feed-list-title').props.children).toBe('Your Feeds');

    fireEvent.press(getByTestId('add-feed-button'));
    expect(navigation.navigate).toHaveBeenCalledWith('AddFeed');
  });
});
