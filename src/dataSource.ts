import { DataSource } from "typeorm";
import { join } from "path";

import { POSTGRES_PASSWORD, POSTGRES_USER, __PROD__ } from "./constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  database: "vstodo",
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  logging: !__PROD__,
  synchronize: !__PROD__,
  entities: [join(__dirname, "./entities/*.*")]
});
