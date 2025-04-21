import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ArticleListScreen from "~/screens/ArticleListScreen";

import AddFeedScreen from "../screens/AddFeedScreen";
import ArticleScreen from "../screens/ArticleScreen";
import FeedListScreen from "../screens/FeedListScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Feeds"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <Stack.Screen
          name="Feeds"
          component={FeedListScreen}
          options={{ title: "Your Feeds" }}
        />
        <Stack.Screen
          name="AddFeed"
          component={AddFeedScreen}
          options={{ title: "Add New Feed" }}
        />
        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          options={({ route }) => ({ title: route.params.title || "Article" })}
        />
        <Stack.Screen
          name="ArticleList"
          component={ArticleListScreen}
          options={({ route }) => ({ title: route.params.title || "" })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
