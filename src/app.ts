import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
const app = express();
// parser
app.use(express.json());
// middleware
app.use(cors());
const check = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.get('/', check, (req: Request, res: Response, next: NextFunction) => {
  res.send('Testing server');
  next();
});

export default app;
