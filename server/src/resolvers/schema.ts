import { buildSchema } from "type-graphql";
import { UserResolver } from "./user.js";

export const schema = await buildSchema({
  resolvers: [UserResolver],
});
