import express from 'express';
import { InMemoryUserRepo } from '../../../domain/src/services/InMemoryUserRepo';
import { RegisterUser } from '../../../domain/src/use-cases/RegisterUser';
import { LoginUser } from '../../../domain/src/use-cases/LoginUser';

const app = express();
app.use(express.json());

const userRepo = new InMemoryUserRepo();
const registerUser = new RegisterUser(userRepo);
const loginUser = new LoginUser(userRepo);

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

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

