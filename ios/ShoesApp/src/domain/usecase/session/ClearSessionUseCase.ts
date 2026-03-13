import { SessionRepository } from "../../repositories/SessionRepository";

export class ClearSessionUseCase {
  constructor(private readonly repo: SessionRepository) {}

  execute() {
    this.repo.clear();
  }
}
