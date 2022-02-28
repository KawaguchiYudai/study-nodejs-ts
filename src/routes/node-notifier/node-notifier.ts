import { NextFunction, Request, Response } from "express";
import notifier from 'node-notifier';
/*
https://www.npmjs.com/package/node-notifier
https://www.npmjs.com/package/@types/node-notifier
*/
export const testNodeNotifier = (req: Request, res: Response, next: NextFunction) => {
    notifier.notify({
        title: 'My notification',
        message: 'Hello, there!'
    });
    res.status(200).send('ok');
    return
};