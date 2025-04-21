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
- [ ] install and set up MMKV
- [ ] install and set up React Query
- [ ] configure QueryClientProvider
- [ ] implement usePersistedFeeds using MMKV
- [ ] screen: list of subscribed feeds
- [ ] screen: articles list
- [ ] screen: add new feed
- [ ] screen: article details
- [ ] parse RSS data 
- [ ] tests for hooks and components

## Challenges: 
- testing MMKV-based hooks in Expo
- parsing RSS without relaying on  node-specific packages
- in-app browser for article reading ?
- adding feeds: (toast, alert, inline) 
- fallback when parsing fails 

## Approach:
- chill & experimental
- write tests early 
- commit each step
- functionaliy > polish
