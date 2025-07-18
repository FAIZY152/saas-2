import dotenv from "dotenv";
dotenv.config();

export class Env {
  static BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";
  static MONGO_URI = process.env.MONGO_URI;
  static JWT_SECRET = process.env.JWT_SECRET;
  static REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
}
