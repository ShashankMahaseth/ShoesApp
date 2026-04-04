import { SessionRepository } from "../../repositories/SessionRepository";

export class SetLoggedInUseCase {
  constructor(private readonly repo: SessionRepository) {}

  execute(value: boolean) {
    this.repo.setLoggedIn(value);
  }
}




