# Admission App (React Native)

A cross-platform React Native application that helps students explore institutions, chat with advisors, apply for higher education abroad, and manage profiles/documents. This project includes a localized (BN/EN) UI, a custom drawer, profile management forms, document upload cards, an institution catalog with sorting and filtering, and a complete authentication flow with password reset.

## Features

- Authentication: Sign In/Up, OTP verification, Forgot Password (email → OTP → reset)
- Localization (BN/EN) via a simple translation context
- Home: custom header with menu drawer (Documents, My Session, Application, Change Password, Help & Support, Logout)
- Profile: primary and academic information forms, 75% progress bar, document upload cards (dashed borders, gray icons)
- Institutions: dummy data list with Tuition Fees sorting, IELTS and Country filtering, polished chips and tags per card
- Support screen explaining app purpose and usage
- Change Password screen (BN/EN) with floating-label password fields
- Reusable Floating Label Input component

## Tech Stack

- React Native 0.81.x, React 19
- Navigation: @react-navigation (stack + bottom tabs)
- State/Data: @tanstack/react-query for future API integration
- UI: react-native-vector-icons, custom components
- Tooling: ESLint, Jest

## Getting Started

### Prerequisites

- Node.js >= 20
- Java 17 (for Android), Xcode (for iOS)
- Android SDK / iOS setup per React Native docs

### Install

```bash
npm install
```

### Run Metro (dev server)

```bash
npm run start
```

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

If you’re running on a physical device/emulator, ensure Metro is reachable (same network or proper adb reverse for Android).

## Project Structure

```
src/
  components/
    CustomToast.js
    FloatingLabelInput.js
    home/
      HomeHeader.js
      HomeDrawer.js
  context/
    AuthContext.js
    LanguageContext.js
  hooks/
    useAuthMutations.js
    useInstitutions.js
    useMe.js
  navigation/
    AppNavigator.js
  screens/
    AdviserChat.js
    ApplicationForm.js
    ChangePasswordScreen.js
    EventsScreen.js
    ForgotPasswordEmailScreen.js
    ForgotPasswordOTPScreen.js
    ForgotPasswordResetScreen.js
    HomeScreen.js
    InstituteDetailsScreen.js
    InstitutionScreen.js
    MainScreen.js
    NotificationsScreen.js
    OnboardingScreen.js
    OTPVerificationScreen.js
    ProfileScreen.js
    SignInScreen.js
    SignUpScreen.js
    SplashScreen.js
  services/
    api.js
```

## Key Implementation Notes

- LanguageContext: add BN/EN strings in one place; use `const { t } = useLanguage();` and `t('key')` everywhere for UI text.
- Drawer: implemented as a component (`HomeDrawer`) with props for open/close and navigation handlers; hides bottom tab bar while open.
- Profile: header shows left-aligned title, right 75% progress bar; inputs have labels; document cards have dashed borders and gray icons.
- Institutions: in `InstitutionScreen.js` we use dummy data extended with `price`, `ielts`, `country`. Sorting is tuition-driven, and filters include IELTS thresholds and Country pills.
- Forgot Password flow: 3 screens with consistent header/back and logo row; OTP uses 4 input boxes with auto-advance.
- FloatingLabelInput: shared component with animated label, focus styling, and password visibility toggle; prevents keyboard from hiding unexpectedly (no blur-on-submit).

## Environment & Configuration

- API endpoints are stubbed; integrate your backend by updating `src/services/api.js` and hooks (e.g., `useAuthMutations`).
- Set AsyncStorage keys as needed (e.g., onboarding flag, language).

## Scripts

- `npm run start` – Start Metro bundler
- `npm run android` – Build and launch Android app
- `npm run ios` – Build and launch iOS app
- `npm run lint` – Lint the codebase
- `npm test` – Run unit tests (Jest)

## Testing

- Unit tests live in `__tests__/`. Extend as needed for new components and hooks.

## Contributing

1. Fork the repo and create a feature branch.
2. Make changes with clear, readable code. Follow project code style.
3. Run lints and tests.
4. Open a PR describing changes and screenshots for UI updates.

## License

This project is private. All rights reserved.
