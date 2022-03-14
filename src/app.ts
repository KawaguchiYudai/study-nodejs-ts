import express = require('express')
import * as usersRouter from "./routes/users";
import * as wsRouter from './routes/ws/ws';

const app = express();
app.get('/', usersRouter.hello);
app.get('/test/:text', usersRouter.test);

wsRouter.wsTest();

export default app;