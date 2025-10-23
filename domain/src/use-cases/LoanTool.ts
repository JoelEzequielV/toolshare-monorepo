import { IToolRepository } from '../repositories/IToolRepository';

export class LoanTool {
  constructor(private toolRepo: IToolRepository) {}

  async execute(toolId: string): Promise<void> {
    const tool = await this.toolRepo.findById(toolId);
    if (!tool) throw new Error('Tool not found');
    if (!tool.available) throw new Error('Tool not available');

    tool.available = false;
    await this.toolRepo.save(tool);
  }
}
