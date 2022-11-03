import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { IS_PRODUCTION } from "../constants.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
console.log("filename", __filename);
const __dirname = dirname(__filename);
console.log("dirname", __dirname);

export const dataSource = new DataSource({
  type: "postgres",
  database: "digimon",
  username: "postgres",
  password: "postgres",
  logging: !IS_PRODUCTION,
  synchronize: true,
  migrations: [path.join(__dirname, "../migrations/*")],
  entities: [User],
  port: 5432,
});
