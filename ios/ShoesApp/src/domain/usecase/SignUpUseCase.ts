import { AuthRepository } from "../repositories/AuthRepository";

export class SignUpUseCase {
  constructor(private repository: AuthRepository) {}

  execute(email: string, password: string) {
    return this.repository.signUp(email, password);
  }
}
