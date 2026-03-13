import { authPrefs } from "../../storage/authPrefs";

export class SessionLocalDataSource {
  isFirstTimeLogin(): boolean {
    return authPrefs.isFirstTimeLogin();
  }

  markFirstTimeDone(): void {
    authPrefs.markFirstTimeDone();
  }

  isLoggedIn(): boolean {
    return authPrefs.isLoggedIn();
  }

  setLoggedIn(value: boolean): void {
    authPrefs.setLoggedIn(value);
  }

  clear(): void {
    authPrefs.clear();
  }
}
