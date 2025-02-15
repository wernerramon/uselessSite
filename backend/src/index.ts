import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import factRoutes from './routes/factsRoute';
import usersRoute from "./routes/usersRoute";

console.log('Starting server...');

dotenv.config();
const PORT = 5001;

const app = express();
app.use(cors());
app.use(express.json());


const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) {
  console.error('MongoDB connection URI missing!');
  process.exit(1);
}

mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error: Error) => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });

app.use('/fact', factRoutes);
app.use('/user', usersRoute);
app.use((req, res) => {
  console.log('Route not found:', req.url);
  res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});