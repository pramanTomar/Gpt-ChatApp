import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import { Configuration, OpenAIApi } from "openai";
import openAiRoutes from './routes/openai.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/openai', openAiRoutes);
app.use('/auth', authRoutes);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log("Server running on PORT", PORT);
});

export {openai};