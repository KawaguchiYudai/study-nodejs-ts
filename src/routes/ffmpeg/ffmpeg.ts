import { NextFunction, Request, Response } from "express";

export const test = (req: Request, res: Response, next: NextFunction) => {
  res.send(req.params.text);
};

