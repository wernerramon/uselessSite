import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 5001;

const examples = [
    "- A shrimp's heart is located in its head",
    "- Bananas are berries, but strawberries are not",
    "- Wombat poop is cube-shaped",
    "- A day on Venus is longer than a year on Venus",
    "- The inventor of the frisbee was turned into a frisbee after he died",
];
const prompt = "Generate a useless but true fact. Example: "
    + examples[Math.floor(Math.random() * examples.length)]
    + ".  Now generate another useless but true fact:";


app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Route to get facts
app.get('/fact', async (req, res) => {
  try {
    const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: prompt,
      stream: false
    });
    console.log('Ollama response:', ollamaResponse.data);
    res.json({ fact: ollamaResponse.data.response });
  } catch (error) {
    console.error('Error fetching fact from Ollama:', error);
    res.status(500).json({ error: 'Error fetching the fact' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
