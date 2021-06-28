import express = require('express')
import * as usersRouter from "./routes/users";

const app = express();
app.get('/', usersRouter.hello);
app.get('/test/:text', usersRouter.test);

export default app;