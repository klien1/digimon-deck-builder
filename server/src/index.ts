import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
// import cors from "cors";
import bodyParser from "body-parser";
import { schema } from "./resolvers/schema.js";
import { dataSource } from "./configs/ormconfig.js";
import { IS_PRODUCTION } from "./constants.js";
import * as dotenv from "dotenv";
import { userSession, redisClient } from "./configs/redis.config.js";

import { DigimonCard } from "./entities/DigimonCard.js";
import cardData from "./entities/card-data.json" assert { type: "json" };

declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}

async function main() {
  dotenv.config();
  console.log("IS IT PRODUCTION? ", IS_PRODUCTION);

  try {
    await dataSource.initialize();
  } catch (error) {
    console.error("db connection error: ", error);
  }

  let card;
  try {
    card = await dataSource
      .getRepository("digimon_card")
      .createQueryBuilder("card")
      .getOne();
  } catch (error) {
    card = null;
    console.error("error accessing card database");
  }

  if (!card) {
    try {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into(DigimonCard)
        .values(cardData)
        .execute();
    } catch (error) {
      console.error("error initializing database");
    }
  }

  const app = express();

  // Set up our Express middleware to handle CORS, body parsing,
  app.set("trust proxy", !IS_PRODUCTION);

  app.use(
    // cors<cors.CorsRequest>({
    //   origin: ["http://localhost:5173", "https://studio.apollographql.com"],
    //   credentials: true,
    // }),
    bodyParser.json()
  );

  app.use(userSession);

  console.log("SET INTROSPECTION TO FALSE BEFORE DEPLOYMENT");
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, redisClient }),
    introspection: true, // TODO: Change to false on release
    debug: !IS_PRODUCTION,
  });

  await apolloServer.start().catch((e) => console.log(e));
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ["http://localhost:5173", "https://studio.apollographql.com"],
    },
  });

  const port = process.env.PORT ?? 4000;
  app.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:${port}/`)
  );
}

main();
