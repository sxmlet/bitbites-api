import express, {Express, json, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {IndexRouter} from './controllers/v0/index.router.js';
import {createLogger} from "./common/logger.js";

dotenv.config();
const logger = createLogger('app-root');

const app: Express = express();
const port = process.env.PORT ?? 3002;

app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info('request received')
    res.header('Content-Type', 'application/json');
    next();
})

app.use(json());

app.use(cors({
    allowedHeaders: [
        'Origin', 'X-Requested-With',
        'Content-Type', 'Accept',
        'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
}));

app.use(IndexRouter)
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
