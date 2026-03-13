export interface SessionRepository {
  isFirstTimeLogin(): boolean;
  markFirstTimeDone(): void;
  isLoggedIn(): boolean;
  setLoggedIn(value: boolean): void;
  clear(): void;
}
