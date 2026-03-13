import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { firebaseDataSource } from "../datasource/firebaseAuthDataSource";

export class AuthRepositoryImplementation implements AuthRepository {
  async login(email: string, password: string): Promise<boolean> {
    await firebaseDataSource.login(email, password);
    return true;
  }

  async signUp(email: string, password: string): Promise<boolean> {
    await firebaseDataSource.signup(email, password);
    return true;
  }

  async logout(): Promise<boolean> {
    await firebaseDataSource.logout();
    return true;
  }

  async forgot(email: string): Promise<boolean> {
    await firebaseDataSource.forgot(email);
    return true;
  }
}
