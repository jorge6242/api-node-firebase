import 'reflect-metadata';
import express, { NextFunction, Request, Response } from "express";
import routerApi from './routes';
import { config } from '../config/config';

const app = express();
app.use(express.json());
routerApi(app);



app.listen(config.port, function () {
  console.log(`Api Server listen by port: ${config.port}`);
});


