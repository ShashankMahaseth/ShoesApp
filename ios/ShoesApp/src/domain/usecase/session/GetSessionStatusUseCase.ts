import { SessionRepository } from "../../repositories/SessionRepository";

export class GetSessionStatusUseCase {
  constructor(private readonly repo: SessionRepository) {}

  execute() {
    return {
      isFirstTime: this.repo.isFirstTimeLogin(),
      isLoggedIn: this.repo.isLoggedIn(),
    };
  }
}
