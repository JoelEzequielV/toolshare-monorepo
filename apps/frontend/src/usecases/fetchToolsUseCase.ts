import { Tool } from "../types/Tool";

export class FetchToolsUseCase {
  constructor(
    private repo: { fetchAll: () => Promise<Tool[]> }
  ) {}

  async execute(): Promise<Tool[]> {
    return await this.repo.fetchAll();
  }
}
