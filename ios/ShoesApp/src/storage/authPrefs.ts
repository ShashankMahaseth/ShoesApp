import { getBoolean, setBoolean, deleteKey, storageKeys } from "./mmkv";

export const authPrefs = {//singleton object
  isFirstTimeLogin: (): boolean => getBoolean(storageKeys.IS_FIRST_TIME, true),
  markFirstTimeDone: () => setBoolean(storageKeys.IS_FIRST_TIME, false),

  isLoggedIn: (): boolean => getBoolean(storageKeys.IS_LOGGED_IN, false),
  setLoggedIn: (value: boolean) => setBoolean(storageKeys.IS_LOGGED_IN, value),
  clear: () => {
    deleteKey(storageKeys.IS_LOGGED_IN);
    deleteKey(storageKeys.IS_FIRST_TIME);
  },
};
