require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const corsOption = {
  Headers: { "content-type": "application/json" },
  origin: true,
  credentials: true,
  method: ["post", "get", "put", "patch", "delete", "options"],
};

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const userrouter = require("./router/user");
const likerouter = require("./router/like")


app.use("/user", userrouter);
app.use("/like", likerouter);

app.get("/", (req, res) => {
  res.status(201).send("Hello CodeFC");
});

module.exports = app;