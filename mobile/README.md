# Athris Mobile (React Native CLI)

Production React Native **CLI** companion app for the [Athris digital wallet](../) web platform.

> This project uses **React Native CLI** (not Expo). Native `android/` and `ios/` projects are included.

## Stack

- React Native 0.76 (CLI)
- TypeScript
- React Navigation (native stack + bottom tabs)
- NativeWind (Tailwind)
- Zustand + TanStack Query
- React Hook Form + Zod
- Supabase Auth (shared with Next.js)
- react-native-keychain, react-native-biometrics, react-native-linear-gradient

## Prerequisites

- Node.js 18+
- Xcode (iOS) / Android Studio (Android)
- CocoaPods (`sudo gem install cocoapods`) for iOS

## Getting started

```bash
cd mobile
cp .env.example .env
npm install

# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android

# Metro only
npm run start
```

### Environment

| Variable | Description |
|----------|-------------|
| `EXPO_PUBLIC_SUPABASE_URL` | Same as web (kept name for parity) |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `EXPO_PUBLIC_API_URL` | Next.js URL for Nova `/api/chat` |
| `EXPO_PUBLIC_DEMO_MODE` | `true` = mock data + demo login |

> Env vars still use the `EXPO_PUBLIC_` prefix from the initial scaffold; rename to `ATHRIS_` in `.env` if you prefer—update `src/lib/config.ts` accordingly.

### Demo mode

On login, tap **Try Demo Account** when `EXPO_PUBLIC_DEMO_MODE=true`.

## Project structure

```
mobile/
  android/          Native Android project
  ios/              Native iOS project
  index.js          App entry
  App.tsx           Root component
  src/
    navigation/     React Navigation
    screens/        All UI screens
    components/     Shared UI
    services/       Supabase + wallet logic
    ...
```

## Backend integration

Same as the web app: Supabase tables, MYR formatting, Nova via `POST /api/chat`.
