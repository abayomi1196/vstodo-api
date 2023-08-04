import "reflect-metadata";
import express from "express";

import { AppDataSource } from "./dataSource";

const main = async () => {
  // load entities, establish db connection, sync schema etc
  await AppDataSource.initialize();

  const app = express();

  app.get("/", (_req, res) => {
    res.send("hello");
  });

  app.listen(3002, () => {
    console.log("Listening on localhost:3002");
  });
};

main();
