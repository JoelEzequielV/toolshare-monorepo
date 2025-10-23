import express from 'express';
import { InMemoryUserRepo } from '../../../domain/src/services/InMemoryUserRepo';
import { RegisterUser } from '../../../domain/src/use-cases/RegisterUser';

const app = express();
app.use(express.json());

const userRepo = new InMemoryUserRepo();
const registerUser = new RegisterUser(userRepo);

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser.execute(name, email, password);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
