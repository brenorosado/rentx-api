import { Handler, NextFunction, Request, Response } from "express";

export const routeAdapter = (handler: Handler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handler(req, res, next))
      .catch(e => next(e));
  };
};