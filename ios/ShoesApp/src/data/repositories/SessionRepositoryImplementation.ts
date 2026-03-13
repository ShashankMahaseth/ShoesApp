import { SessionRepository } from "../../domain/repositories/SessionRepository";
import { SessionLocalDataSource } from "../datasource/sessionLocalDataSource";

export class SessionRepositoryImplementation implements SessionRepository {
  constructor(private readonly local: SessionLocalDataSource) {}

  isFirstTimeLogin(): boolean {
    return this.local.isFirstTimeLogin();
  }

  markFirstTimeDone(): void {
    this.local.markFirstTimeDone();
  }

  isLoggedIn(): boolean {
    return this.local.isLoggedIn();
  }

  setLoggedIn(value: boolean): void {
    this.local.setLoggedIn(value);
  }

  clear(): void {
    this.local.clear();
  }
}
