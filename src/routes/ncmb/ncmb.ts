import { NextFunction, Request, Response } from "express";
const NCMB = require('ncmb');
const ncmb = new NCMB('applicationKey', 'clientKey');

export const ncmbPush = async (req: Request, res: Response, next: NextFunction) => {
    const push = new ncmb.Push();
    push.set("title", "Hello, NCMB!")
        .send()
        .then((newPush: any) => {
            console.log(newPush);
        })
        .catch((err: any) => {
            console.log(err);
        });
    res.status(200).send('ok');
    return
}