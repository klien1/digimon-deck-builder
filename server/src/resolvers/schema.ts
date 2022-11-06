import { buildSchema } from "type-graphql";
import { UserResolver } from "./user/user.js";
import { DigimonCardResolver } from "./digimon-cards/digimonCards.js";

export const schema = await buildSchema({
  resolvers: [UserResolver, DigimonCardResolver],
});
