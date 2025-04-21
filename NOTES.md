# RSS Reader App

## Initial setup

This is a continuation of the web version - started there with React now moving to Expo . 

GOAL:local storageof RSS subscriptions with clean UX. 

## What I have from the web version: 
- basic concept: local persisted RSS feeds
- a custom usePersistedFeeds hook 
- data cache via react query
- tests for components and hooks - behaviour should be similar

## To Do: 
- [x] init Expo project
- [x] install and set up MMKV
- [x] install and set up React Query
- [x] configure QueryClientProvider
- [x] implement usePersistedFeeds using MMKV
- [x] screen: list of subscribed feeds
- [x] screen: articles list
- [x] screen: add new feed
- [x] screen: article details
- [x] parse RSS data 
- [ ] tests for hooks and components - X FAIL < I need to improve in this part 

## Challenges: 
- parsing RSS without relaying on  node-specific packages
- in-app browser for article reading ?
- adding feeds: (toast, alert, inline) 
- fallback when parsing fails 

## Approach:
- chill & experimental
- write tests early 
- commit each step
- functionaliy > polish
