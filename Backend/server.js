require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./src/db/config.db");
const demomodeRouter = require("./src/routers/demomode.router");
const userRouter = require("./src/routers/user.router");
const noticeRouter = require("./src/routers/notice.router");
const setRouter = require("./src/routers/setexam.router");

const app = express();

// DB connection
db();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/demomode", demomodeRouter);
app.use("/api/user", userRouter);
app.use("/api/user", noticeRouter);
app.use("/api/setexam", setRouter);

app.get("/home", (req, res) => {
  return res.status(200).json({ message: "Hello world" });
});

/**
 * ✅ IMPORTANT:
 * - Only listen locally
 * - Export app for Vercel
 */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
  });
}

module.exports = app;
