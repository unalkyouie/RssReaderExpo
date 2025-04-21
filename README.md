# 🚀 RSS Reader Expo App

**Original web version:** [unalkyouie/rss-reader-web](https://github.com/unalkyouie/rss-reader-web)

A mobile continuation of the web-based RSS Reader: local storage of subscriptions, offline cache, and a clean UX, built with Expo.

---

## 📦 Initial setup

1. Clone this repository:
   ```bash
   git clone https://github.com/unalkyouie/RssReaderExpo.git
   cd RssReaderExpo
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the Expo development server:
   ```bash
   yarn start
   ```
4. Open on your device or simulator:
   - Scan the QR code with Expo Go (iOS/Android)
   - Or run:
     ```bash
     yarn android
     yarn ios
     yarn web
     ```

### 📱 Viewing in Expo Go

1. Install the **Expo Go** app from the App Store (iOS) or Google Play Store (Android).
2. Ensure your computer and mobile device are on the **same local network**.
3. When the Expo Metro Bundler starts, a QR code will appear in your terminal or browser.
4. Open **Expo Go**, tap “Scan QR Code”, and point your camera at the code.
5. The app will load automatically in Expo Go; you can reload with ⌘+R (iOS) or double tap R (Android).

---

## 🔧 What’s already here (from the web version)

- **Local persistence** of RSS feed URLs via `usePersistedFeeds` hook
- **Data caching** and fetching with React Query
- **Component & hook tests** (Jest + Testing Library)
- Basic UI wireframe and navigation

## 🚀 Hosting & Distribution

You don’t need to submit the app to the App Store or Google Play to share it with testers or users:

### 1. Expo Publish (OTA)

- Use Over-the-Air updates (OTA):
  ```bash
  expo publish --release-channel production
  ```
- After publishing, you’ll get a link to open in Expo Go, for example:
  ```
  https://expo.dev/@unalkyouie/rssreader?release-channel=production
  ```
- Users can paste this link in Expo Go to load your app.

### 2. EAS Build + Internal Distribution

- Configure EAS:
  ```bash
  eas build:configure
  ```
- Build binaries on Expo servers:
  ```bash
  eas build --platform android
  eas build --platform ios
  ```
- Share the generated APK/IPA links via Slack, email, etc.

### 3. Web / PWA

- Export a web build:
  ```bash
  expo build:web
  ```
- Deploy the contents of the `web-build/` folder to Netlify, Vercel, GitHub Pages, or any static host.

---

## 📚 Resources

- Expo documentation: https://docs.expo.dev
- React Native MMKV: https://github.com/mrousavy/react-native-mmkv
- TanStack React Query: https://tanstack.com/query/v4
- React Navigation: https://reactnavigation.org
- rss-parser: https://github.com/rbren/rss-parser

---

## ⚖️ License

MIT © Aleksandra Pikus

