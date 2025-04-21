import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainNavigator from './navigation/index';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <MainNavigator />
    </QueryClientProvider>
  );
}
export default App