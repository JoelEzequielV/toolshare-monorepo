import express from 'express';
import cors from 'cors';
import { InMemoryUserRepo } from '../../../domain/src/services/InMemoryUserRepo';
import { InMemoryToolRepo } from '../../../domain/src/services/InMemoryToolRepo';
import { RegisterUser } from '../../../domain/src/use-cases/RegisterUser';
import { LoginUser } from '../../../domain/src/use-cases/LoginUser';
import { AddTool } from '../../../domain/src/use-cases/AddTool';
import { LoanTool } from '../../../domain/src/use-cases/LoanTool';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // permite solo tu frontend
}));

const userRepo = new InMemoryUserRepo();
const toolRepo = new InMemoryToolRepo();

const registerUser = new RegisterUser(userRepo);
const loginUser = new LoginUser(userRepo);
const addTool = new AddTool(toolRepo);
const loanTool = new LoanTool(toolRepo);


app.get('/tools', async (req, res) => {
  try {
    const tools = await toolRepo.getAll();
    res.json(tools);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser.execute(name, email, password);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser.execute(email, password);
    res.json({ user, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/tools', async (req, res) => {
  try {
    const { name, description } = req.body;
    const tool = await addTool.execute(name, description);
    res.status(201).json(tool);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/tools/:id/loan', async (req, res) => {
  try {
    const { id } = req.params;
    await loanTool.execute(id);
    res.json({ message: 'Tool loaned successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
