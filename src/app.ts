import express = require('express')
import * as usersRouter from "./routes/users";
import * as notifierRouter from './routes/node-notifier/node-notifier';

const app = express();
app.get('/', usersRouter.hello);
app.get('/test/:text', usersRouter.test);

app.get('/notifier', notifierRouter.testNodeNotifier);

export default app;