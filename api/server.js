const express = require("express"),
  helmet = require("helmet"),
  cors = require("cors"),
  server = express();

const UserRoute = require("../users/users-route.js");
const AuthRouter = require("../auth/auth-route.js");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("connect");
});

server.use("/api/users", UserRoute);
server.use("/api/auth", AuthRouter);

module.exports = server;
