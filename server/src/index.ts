import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
// import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
// import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { schema } from "./resolvers/schema.js";
import { dataSource } from "./configs/datasource.js";
// import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { PORT } from "./constants.js";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.js";

// interface MyContext {
//   token?: string;
// }

async function main() {
  // Required logic for integrating with Express

  await dataSource.initialize().catch((error) => console.error(error));

  const app = express();

  // const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema,
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // const apolloServer = new ApolloServer({
  //   schema: await buildSchema({
  //     resolvers: [UserResolver],
  //   }),
  // });
  await apolloServer.start().catch((e) => console.log(e));
  apolloServer.applyMiddleware({ app });

  // Set up our Express middleware to handle CORS, body parsing,
  app.use(cors<cors.CorsRequest>(), bodyParser.json());

  app.get("/hello", (_, res) => {
    res.send({ hello: "world" });
  });

  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}/`)
  );
}

main();
