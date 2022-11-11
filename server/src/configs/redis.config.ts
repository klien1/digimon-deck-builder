import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { COOKIE_NAME } from "../constants.js";
import * as dotenv from "dotenv";

dotenv.config();

const redisStore = connectRedis(session);
// export const redisClient = new Redis();

// docker
export const redisClient = new Redis(6379, process.env.REDIS_URL as string);

export const userSession = session({
  name: COOKIE_NAME,
  store: new redisStore({
    client: redisClient,
    disableTouch: true,
    disableTTL: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    httpOnly: true,
    // secure: IS_PRODUCTION,
    // sameSite: "lax",
    // cookiese on server
    secure: false,
    sameSite: "lax",
  },
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET_KEY!,
});
