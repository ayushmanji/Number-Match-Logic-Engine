# 🎮 Number Match Logic Engine

[![Android Release](https://img.shields.io/badge/Download-Android%20APK-brightgreen?style=for-the-badge&logo=android)](https://github.com/ayushmanji/Number-Match-Logic-Engine/releases/download/v1.0.0/app-release.apk)
[![GitHub Release](https://img.shields.io/github/v/release/ayushmanji/Number-Match-Logic-Engine?style=for-the-badge&logo=github)](https://github.com/ayushmanji/Number-Match-Logic-Engine/releases/tag/v1.0.0)

> A deterministic solvability system and interactive game engine for Number Match puzzles, built with React, TypeScript, Vite, and Capacitor for Android.

---

## 📲 Direct APK Download

Download the release APK for Android directly (no login required):

👉 **[Download Production Release APK (v1.0.0)](https://github.com/ayushmanji/Number-Match-Logic-Engine/releases/download/v1.0.0/app-release.apk)**

- **Package Name**: `com.ezygamers.sumlinknumbergame`
- **Version**: `1.0.0`
- **Minimum Android SDK**: 24 (Android 7.0+)
- **Target Android SDK**: 36 (Android 16+)
- **File Size**: ~3.36 MB

---

## ✨ Features

- **Interactive Game Board**: Play classic Number Match puzzle levels with state tracking and hint generation.
- **Deterministic Solvability Engine**: Solvability simulator panel to model outcomes, strategy analysis, and level performance.
- **Sawtooth Chart Visualization**: Dynamic charting of puzzle difficulty and pair density across steps.
- **Interactive Documentation**: Built-in architecture breakdown, game rules, and technical specifications.
- **Cross-Platform Design**: Responsive web layout compiled into a native Android app via Capacitor.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide Icons, Recharts
- **Mobile Container**: Capacitor 8 (Android)
- **Tooling**: Gradle, Oxlint, JDK 24

---

## 🚀 Local Development Setup

### 1. Web Development Server

```bash
npm install
npm run dev
```

### 2. Build Production Web Bundle

```bash
npm run build
```

### 3. Sync & Build Android APK

```bash
# Sync web build to native Android project
npx cap sync android

# Build release APK
cd android
./gradlew assembleRelease
```

The compiled APK will be output to `android/app/build/outputs/apk/release/app-release.apk`.

---

## 🎥 Demo & Media

A full video demonstration of the app in action is available in the repository at [`demo video/db8e911d7aa54726a90ac86a5f114ec3.mp4`](demo%20video/db8e911d7aa54726a90ac86a5f114ec3.mp4).

---

## 🔗 Project Links

- **GitHub Repository**: [https://github.com/ayushmanji/Number-Match-Logic-Engine](https://github.com/ayushmanji/Number-Match-Logic-Engine)
- **GitHub Release Page**: [https://github.com/ayushmanji/Number-Match-Logic-Engine/releases/tag/v1.0.0](https://github.com/ayushmanji/Number-Match-Logic-Engine/releases/tag/v1.0.0)
- **Direct APK Download**: [https://github.com/ayushmanji/Number-Match-Logic-Engine/releases/download/v1.0.0/app-release.apk](https://github.com/ayushmanji/Number-Match-Logic-Engine/releases/download/v1.0.0/app-release.apk)
