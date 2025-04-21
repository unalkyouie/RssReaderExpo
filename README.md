# 📲 RSS Reader – Expo Mobile App

**Web version**: [unalkyouie/rss-reader-web](https://github.com/unalkyouie/rss-reader-web)  
**Mobile version (this repo)**: Offline-friendly RSS Reader built with **Expo**, **React Native**, **MMKV** and **React Query**.

> 🧪 Currently under testing — feel free to try it on your phone via Expo Go.

---

## 🚀 Preview App (Expo Go)

To test the app on your mobile device:

1. **Install [Expo Go](https://expo.dev/client)** (iOS/Android)
2. Open this link on your phone or scan the QR code inside Expo Go:

👉 [Launch the app](https://expo.dev/accounts/unalkyouie/projects/RssReader/updates/35c0dcc3-932b-464f-880b-e3f786a3f98b)

> Expo Go will load the app and cache it. You can reopen it anytime later from within the app.

---

## 🛠️ Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/unalkyouie/RssReaderExpo.git
   cd RssReaderExpo
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Start the development server**:
   ```bash
   yarn start
   ```

4. **Open the app**:
   - Mobile: Scan the QR code in terminal with Expo Go
   - Emulator/simulator:
     ```bash
     yarn android
     yarn ios
     ```
   - Web:
     ```bash
     yarn web
     ```

---

## 🧠 Features

- ✅ **Add/Edit/Delete** custom RSS feeds
- ⭐️ **Favorite** articles (saved offline)
- ✅ **Mark as Read** state for articles
- 🧠 **Local storage** using [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)
- ⚡ **Data fetching & caching** via [React Query](https://tanstack.com/query/v4)
- 🧭 **Navigation** with React Navigation Stack
- 🪟 **In-app article reader** via WebView
- 🌿 Clean, responsive UI with **UI Kitten** and glassmorphism-inspired styling

---

## ☁️ Deployment (for development/testing)

We're using **EAS Update** to share new versions instantly:

- Push a new OTA update:
  ```bash
  eas update --branch preview
  ```
- After deployment, a new URL will be available like:
  ```
  https://expo.dev/accounts/<your-user>/projects/RssReader/updates/<update-id>
  ```

---

## 📚 Stack

- **Expo SDK**
- **React Native**
- **MMKV** (superfast local storage)
- **React Query**
- **React Navigation**
- **UI Kitten**
- **RSS XML parsing** via `fast-xml-parser`

---

## 📜 License

MIT © Aleksandra Pikus
