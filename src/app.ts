import express = require('express')
import * as usersRouter from "./routes/users";
import * as notistack from './routes/notistack/notistack';

const app = express();
app.get('/', usersRouter.hello);
app.get('/test/:text', usersRouter.test);

app.get('/notistack', notistack.messageButtons)

export default app;