import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors({
 origin: (origin, callback) => {
    callback(null, origin || "*");
  },
    credentials: true,
}));
app.use(express.json());

app.get('/api/main/health',(_,res)=> res.send({message: 'OK'}))

export default app;
