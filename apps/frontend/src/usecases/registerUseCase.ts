import { AuthResponse } from "../types/User";

export class RegisterUseCase {
  constructor(
    private repo: { register: (name: string, email: string, password: string) => Promise<AuthResponse> }
  ) {}

  async execute(name: string, email: string, password: string): Promise<AuthResponse> {
    return await this.repo.register(name, email, password);
  }
}
