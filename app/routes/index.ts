import express, { Express } from 'express';

import taskRouter from './task.route';

export default function routerApi(app: Express) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/tasks', taskRouter);
}
