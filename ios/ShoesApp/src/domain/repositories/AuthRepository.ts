export interface AuthRepository {
  login(email: string, password: string): Promise<boolean>;
  signUp(email: string, password: string): Promise<boolean>;
  logout(): Promise<boolean>;
  forgot(email: string): Promise<boolean>;
}
