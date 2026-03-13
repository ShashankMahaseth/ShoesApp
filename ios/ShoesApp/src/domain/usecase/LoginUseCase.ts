import { AuthRepository } from "../repositories/AuthRepository";

export class LoginUseCase {
  constructor(private repository: AuthRepository) {}

  execute(email: string, password: string) {
    return this.repository.login(email, password);
  }
}
