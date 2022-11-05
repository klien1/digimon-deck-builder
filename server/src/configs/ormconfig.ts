import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { DigimonCard } from "../entities/DigimonCard.js";
import { IS_PRODUCTION } from "../constants.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: !IS_PRODUCTION,
  synchronize: false,
  migrations: [path.join(__dirname, "../migrations/*")],
  entities: [User, DigimonCard],
});
