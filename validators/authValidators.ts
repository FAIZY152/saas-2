import { z } from "zod";

// Common email validation
const emailSchema = z
  .string()
  .email("Please enter a valid email address")
  .min(1, "Email is required")
  .max(254, "Email is too long")
  .toLowerCase()
  .trim();

// Strong password validation
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(128, "Password is too long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  );

// Full name validation
const fullnameSchema = z
  .string()
  .min(2, "Full name must be at least 2 characters")
  .max(50, "Full name is too long")
  .regex(/^[a-zA-Z\s'-]+$/, "Full name can only contain letters, spaces, hyphens, and apostrophes")
  .trim();

// Registration schema
export const registerSchema = z.object({
  fullname: fullnameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Login schema (more lenient for existing users)
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

// Password reset schema
export const passwordResetSchema = z.object({
  email: emailSchema,
});

// Change password schema
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Profile update schema
export const profileUpdateSchema = z.object({
  fullname: fullnameSchema,
  email: emailSchema,
});

// Export types
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type PasswordResetData = z.infer<typeof passwordResetSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
