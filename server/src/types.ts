import { Request, Response } from "express";
import { Redis } from "ioredis";

export type DigimonContext = {
  req: Request;
  res: Response;
  redisClient: Redis;
};
