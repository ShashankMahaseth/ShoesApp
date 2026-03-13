import { AuthRepositoryImplementation } from "../../data/repositories/AuthRepositoryImplementation";
import { ForgotUseCase } from "../../domain/usecase/ForgotUseCase";
import { LoginUseCase } from "../../domain/usecase/LoginUseCase";
import { LogoutUseCase } from "../../domain/usecase/LogoutUseCase";
import { SignUpUseCase } from "../../domain/usecase/SignUpUseCase";

// Lightweight wiring (no DI container) to keep layers separated.
const authRepository = new AuthRepositoryImplementation();

export const authUseCases = {
  login: new LoginUseCase(authRepository),
  signUp: new SignUpUseCase(authRepository),
  logout: new LogoutUseCase(authRepository),
  forgot: new ForgotUseCase(authRepository),
};
