import express from "express";
import { config } from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import AdminRouter from "./routes/admin.route.js";
import morgan from 'morgan'

config();

const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials : true
}))

app.use(morgan("dev"))



app.use('/api/admin' , AdminRouter);


export default app