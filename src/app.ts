import express = require('express')
import * as usersRouter from "./routes/users";
import * as ncmb from './routes/ncmb/ncmb';

const app = express();
app.get('/', usersRouter.hello);
app.get('/test/:text', usersRouter.test);
app.get('/ncmb', ncmb.ncmbPush);

export default app;