// lib/db.ts
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI env variable in .env.local");
}

// Extend global to cache across hot reloads
declare global {
  var mongooseGlobal: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

let cached = global.mongooseGlobal;
if (!cached) {
  cached = global.mongooseGlobal = { conn: null, promise: null };
}

export async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // adjust based on demands
    };
    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
