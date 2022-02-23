import { NextFunction, Request, Response } from "express";
import * as notistack from 'notistack';

export const messageButtons = (req: Request, res: Response, next: NextFunction) => {
    notistack.useSnackbar.caller('test', { variant: 'success' });

    res.status(200).send('ok');
    return
};