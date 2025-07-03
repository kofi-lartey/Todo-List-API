import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { todoListRoute } from './routers/todoList-route.js';
import { userRoute } from './routers/users-route.js';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/api',todoListRoute)
app.use('/api',userRoute)

const PORT = process.env.PORT || 4080
const MONGOURI = process.env.MONGO_URI

export const SECRET = process.env.SECRET

await mongoose.connect(MONGOURI)

app.listen(PORT,()=>{
    console.log(`Server is running on Port:${PORT}`)
});