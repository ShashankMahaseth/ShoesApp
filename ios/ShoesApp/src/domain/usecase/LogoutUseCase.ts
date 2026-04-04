import { AuthRepository } from "../repositories/AuthRepository";

export class LogoutUseCase {
  constructor(private repository: AuthRepository) {}

  execute() {
    return this.repository.logout();
  }
}
