# ShoesApp - Auth Architecture Guide

This README explains how authentication works in this project using Redux + Clean Architecture.

## 0) Required Packages

Install these packages for this auth architecture:

```bash
npm install @reduxjs/toolkit react-redux
npm install @react-native-firebase/app @react-native-firebase/auth
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-safe-area-context react-native-screens
npm install @react-native-vector-icons/ionicons react-native-size-matters
```

Then for iOS:

```bash
cd ios && pod install && cd ..
```

## 1) Folder Structure (Auth Related)

```text
ios/ShoesApp/src/
  presentation/
    screens/
      AuthScreen.tsx
  redux/
    store/
      store.ts
    hooks/
      hooks.ts
    reducers/
      AuthSlice.ts
    thunk/
      AuthThunk.ts
  domain/
    repositories/
      AuthRepository.ts
    usecase/
      LoginUseCase.ts
      SignUpUseCase.ts
      ForgotUseCase.ts
  data/
    repositories/
      AuthRepositoryImplementation.ts
    datasource/
      firebaseAuthDataSource.ts
```

## 2) Layer Responsibilities

- `presentation`  
  UI and user actions only. No Firebase logic here.

- `redux`  
  App state and async orchestration (`pending/fulfilled/rejected`).

- `domain`  
  Business contracts and use cases. No framework dependency.

- `data`  
  Concrete implementation that talks to Firebase SDK.

## 3) End-to-End Data Flow (Login/Signup)

1. User types `email/password` in `AuthScreen.tsx`.
2. User taps button -> `dispatch(loginThunk(...))` or `dispatch(signupThunk(...))`.
3. `AuthThunk.ts` calls `LoginUseCase` / `SignUpUseCase`.
4. Use case calls `AuthRepository` contract.
5. `AuthRepositoryImplementation` executes datasource call.
6. `firebaseAuthDataSource.ts` calls Firebase:
   - `auth().signInWithEmailAndPassword(email, password)`
   - `auth().createUserWithEmailAndPassword(email, password)`
7. Result returns back through same chain.
8. `AuthSlice.ts` updates Redux state:
   - `pending` -> `status = "loading"`
   - `fulfilled` -> `status = "authenticated"` (or unauthenticated)
   - `rejected` -> `status = "error"`, set `error` message
9. UI re-renders using `useAppSelector(state => state.auth)`.

## 4) Current Redux Auth State

`AuthSlice.ts` keeps:

- `status`: `"idle" | "loading" | "authenticated" | "unauthenticated" | "error"`
- `error`: `string | null`

## 5) Where To Look For What

- Add/change UI behavior: `presentation/screens/AuthScreen.tsx`
- Change auth state logic: `redux/reducers/AuthSlice.ts`
- Change async flow: `redux/thunk/AuthThunk.ts`
- Change business rule: `domain/usecase/*`
- Change API/Firebase implementation: `data/datasource/firebaseAuthDataSource.ts`

## 6) Small Improvement To Remember

In `logoutThunk`, call:

```ts
await repo.logout();
```

not:

```ts
await repo.logout;
```

Otherwise logout method is not executed.

## 7) Quick Rule

UI should never call Firebase directly.  
Always go through:

`Screen -> Thunk -> UseCase -> Repository ->RepositoryImpl-> DataSource -> Firebase -> back to AuthSlice -> AuthScreen`
