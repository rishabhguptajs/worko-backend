import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js'

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/worko/user', userRoutes);
app.use('/worko/auth', authRoutes);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

export default server;
