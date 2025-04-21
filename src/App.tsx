import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import MainNavigator from "./navigation/index";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <MainNavigator />
        </QueryClientProvider>
    </ApplicationProvider>

  );
};
export default App;
