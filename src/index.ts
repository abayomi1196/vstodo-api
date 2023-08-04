require("dotenv-safe").config();
import "reflect-metadata";
import express from "express";
import { Strategy as GitHubStrategy } from "passport-github";
import passport from "passport";

import { AppDataSource } from "./dataSource";

const main = async () => {
  // load entities, establish db connection, sync schema etc
  await AppDataSource.initialize();

  const app = express();

  app.use(passport.initialize());

  passport.serializeUser((user: any, done) => {
    done(null, user.accessToken);
  });
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3002/auth/github/callback"
      },
      function (_, __, profile, cb) {
        console.log(profile);
        cb(null, { accessToken: "", refreshToken: "" });
      }
    )
  );

  app.get("/auth/github", passport.authenticate("github"));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github"),
    function (_req, res) {
      // Successful authentication, redirect home.
      res.send("hello ..u are logged in");
    }
  );

  app.get("/", (_req, res) => {
    res.send("hello");
  });

  app.listen(3002, () => {
    console.log("Listening on localhost:3002");
  });
};

main();
