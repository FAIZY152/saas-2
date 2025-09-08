import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { isEmail } from "validator";

const SALT_ROUNDS = 10;

// Interface describing user properties + methods
export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  provider?: string;
  googleId?: string;
  avatar?: string;
  isVerified?: boolean;
  comparePassword(password: string): Promise<boolean>;
}

// Mongoose Schema with validation, sanitization, hashing
const UserSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [isEmail, "Invalid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    googleId: {
      type: String,
      sparse: true, // Allows multiple null values
    },
    avatar: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (err) {
    return next(err as any);
  }
});

// Compare entered password with hashed
UserSchema.methods.comparePassword = function (this: IUser, candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
export default User;
