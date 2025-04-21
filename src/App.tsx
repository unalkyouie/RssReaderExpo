import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import MainNavigator from "./navigation/index";
import { customTheme } from "./theme/custom-theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const queryClient = new QueryClient();

const App = () => {
  return (<>
  <IconRegistry icons={EvaIconsPack} />
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
        <QueryClientProvider client={queryClient}>
          <MainNavigator />
        </QueryClientProvider>
    </ApplicationProvider>
    </GestureHandlerRootView>
  </>

  );
};
export default App;
