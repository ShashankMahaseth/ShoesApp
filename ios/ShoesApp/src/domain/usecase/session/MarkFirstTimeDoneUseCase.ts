import { SessionRepository } from "../../repositories/SessionRepository";

export class MarkFirstTimeDoneUseCase {
  constructor(private readonly repo: SessionRepository) {}

  execute() {
    this.repo.markFirstTimeDone();
  }
}
