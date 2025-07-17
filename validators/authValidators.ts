import { z } from "zod";

// Zod schema for validation
export const registerSchema = z.object({
  fullname: z.string().min(4, "Full name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});
