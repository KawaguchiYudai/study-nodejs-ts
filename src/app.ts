import express = require('express')
import * as usersRouter from "./routes/users";
import * as ffmpeg from "./routes/ffmpeg/ffmpeg";

const app = express();
app.get('/', usersRouter.hello);
app.get('/test/:text', usersRouter.test);
app.get('/ffmpeg/:num', ffmpeg.test);

export default app;