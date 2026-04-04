import { AuthRepository } from "../repositories/AuthRepository";

export class ForgotUseCase {
  constructor(private repository: AuthRepository) {}

  execute(email: string) {
    return this.repository.forgot(email);
  }
}
