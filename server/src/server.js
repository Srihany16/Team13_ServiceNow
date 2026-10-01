import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and then start server
const startServer = async () => {
  if (process.env.MONGO_URI) {
    await connectDB();
  } else {
    console.warn('MONGO_URI is not defined in .env. Skipping database connection for now.');
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
