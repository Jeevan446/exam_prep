import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";

import db from "./db/configdb.js";
import demomodeRouter from "./routers/demomode.router.js";
import userRouter from "./routers/user.router.js";
import noticeRouter from "./routers/notice.router.js";
import setRouter from "./routers/setexam.router.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173"
    })
  );
}

app.use(express.json());

// Routes
app.use("/api/demomode", demomodeRouter);
app.use("/api/user", userRouter);
app.use("/api/", noticeRouter);
app.use("/api/setexam", setRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

db().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
  });
});
