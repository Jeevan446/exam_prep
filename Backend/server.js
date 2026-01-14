require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./src/db/config.db");
const demomodeRouter = require("./src/routers/demomode.router");
const userRouter = require("./src/routers/user.router");
const noticeRouter = require("./src/routers/notice.router");
const setRouter =require("./src/routers/setexam.router");
//connection to databases 
db();
//handeling cors error
app.use(cors());
app.use(express.json());
app.use("/api/demomode/", demomodeRouter);
app.use("/api/user", userRouter);
app.use("/api/user/", noticeRouter);
app.use("/api/setexam",setRouter);

app.get("/home", (req, res) => {
  return res.status(200).json({ mesage: "Hello world" });
});

app.listen(3000, () => {
  console.log("App is listening at port 3000");
});
