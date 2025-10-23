import { AddTool } from '../AddTool';
import { LoanTool } from '../LoanTool';
import { InMemoryToolRepo } from '../../services/InMemoryToolRepo';

describe('Tool Use Cases', () => {
  let toolRepo: InMemoryToolRepo;
  let addTool: AddTool;
  let loanTool: LoanTool;

  beforeEach(() => {
    toolRepo = new InMemoryToolRepo();
    addTool = new AddTool(toolRepo);
    loanTool = new LoanTool(toolRepo);
  });

  it('should add a tool', async () => {
    const tool = await addTool.execute('Taladro', 'Taladro eléctrico');
    expect(tool.name).toBe('Taladro');
    expect(tool.available).toBe(true);
  });

  it('should loan a tool', async () => {
    const tool = await addTool.execute('Martillo', 'Martillo pesado');
    await loanTool.execute(tool.id);
    const updatedTool = await toolRepo.findById(tool.id);
    expect(updatedTool?.available).toBe(false);
  });

  it('should throw error if loaning unavailable tool', async () => {
    const tool = await addTool.execute('Sierra', 'Sierra circular');
    await loanTool.execute(tool.id);
    await expect(loanTool.execute(tool.id)).rejects.toThrow('Tool not available');
  });
});
