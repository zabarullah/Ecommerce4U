import connectMongoDB from './config/mongodb.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.route.js';
import categoryRoutes from './routes/category.route.js';

dotenv.config();

//Connect to MongoDB
connectMongoDB();

const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const port = process.env.port || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
