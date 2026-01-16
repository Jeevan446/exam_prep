import "dotenv/config";
import  express from "express"
import  cors from "cors"

import db from "./src/db/configdb.js"
import demomodeRouter from "./src/routers/demomode.router.js"
import userRouter from "./src/routers/user.router.js"
import  noticeRouter from "./src/routers/notice.router.js"
import  setRouter from "./src/routers/setexam.router.js"

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

const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
  });
