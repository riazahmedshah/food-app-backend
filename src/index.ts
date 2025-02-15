import express from "express"
import { ConnectDB } from "./config/db";
import { mainRouter } from "./routes/mainRouter";
import cookieParser from "cookie-parser";

const PORT = 1200;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/",mainRouter);


ConnectDB().then(() => {
  console.log("DB connect successfully");
  app.listen(PORT,() => {
    console.log(`Serever is running on http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.error("DB connection failed", err);
});




