import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/main/health',(_,res)=> res.send({message: 'OK'}))

export default app;
