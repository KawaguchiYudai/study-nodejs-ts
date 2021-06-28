import { NextFunction, Request, Response } from "express";

export const hello = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
};
export const test = (req: Request, res: Response, next: NextFunction) => {
  res.send(req.params.text);
};

