import { MMKV } from "react-native-mmkv";

// Try MMKV; fall back to in-memory store if the native module is unavailable
const createSafeStorage = () => {
  try {
    return new MMKV({ id: "shoes-app-storage" }); // Storage name
  } catch (err) {
    console.warn(
      "[storage] MMKV unavailable, using in-memory fallback. Install/link react-native-mmkv for persistence.",
      err
    );
    const mem = new Map<string, boolean>();
    return {
      getBoolean: (key: string) => mem.get(key),
      set: (key: string, value: boolean) => {
        mem.set(key, value);
      },
      delete: (key: string) => mem.delete(key),
    };
  }
};

/*
Why try/catch is used

-> Sometimes MMKV fails if:
-> library not installed correctly
-> native module not linked
-> running on unsupported environment
*/

export const storage = createSafeStorage();

export const storageKeys = {
  IS_FIRST_TIME: "is_first_time_login",
  IS_LOGGED_IN: "is_logged_in",
} as const; // const tells typescript make values readonly

/* Helper Functions */
export const getBoolean = (key: string, fallback = false): boolean => {
  const value = storage.getBoolean ? storage.getBoolean(key) : undefined; // Does getBoolean exist?
  return (value ?? fallback) as boolean; // ?? returns fallback when value is null or undefined
};

export const setBoolean = (key: string, value: boolean) => {
  storage.set?.(key, value);
};

export const deleteKey = (key: string) => {
  storage.delete?.(key);
};

// MMKV wrapper -> Auth prefs helpers -> Local data source class -> Repo layer -> Domain use cases -> wiring/di(sessionModule.ts) -> App entry decision (SplashScreen) -> onboarding -> Auth state + persistence -> lifecycle in order
