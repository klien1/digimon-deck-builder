import { buildSchema } from "type-graphql";
import { UserResolver } from "./user.js";
import { DigimonCardResolver } from "./digimonCards.js";

export const schema = await buildSchema({
  resolvers: [UserResolver, DigimonCardResolver],
});
