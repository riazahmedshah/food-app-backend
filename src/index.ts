import express from "express"
import { ConnectDB } from "./config/db";
import { mainRouter } from "./routes/mainRouter";
import cookieParser from "cookie-parser";
import cors from "cors"

const PORT = 1200;
const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"],
}));

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




