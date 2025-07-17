export class Env {
  static BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";
  static MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/saas";
}
