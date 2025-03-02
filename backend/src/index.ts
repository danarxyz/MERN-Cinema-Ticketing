import express, { type Request, type Response, type Express } from "express";
import dotenv from "dotenv";
import connectDB from "./utils/database";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import cors from "cors";
import bodyParser from "body-parser";
import { handleTopupBalance } from "./controllers/walletController";
import path from "path";

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Make sure this comes before your routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// Debug middleware
app.use("/uploads", (req, res, next) => {
  console.log("Accessing file:", {
    originalUrl: req.originalUrl,
    path: req.path,
    baseUrl: req.baseUrl,
  });
  next();
});

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server ");
});

app.post("/api/global/handle-payment", (req: Request, res: Response) => {
  handleTopupBalance(req, res);
});
app.use("/api/", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);

app.listen(3000, "0.0.0.0", () => {
  console.log("Server berjalan di port 3000 dan bisa diakses dari jaringan");
});
