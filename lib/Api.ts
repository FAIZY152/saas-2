import { registerSchema } from "./../validators/authValidators";
import { Env } from "./Env";

export const BASE_URL = Env.BACKEND_URL;
export const API_URL = `${BASE_URL}/api`;
export const REGISTER_URL = `${API_URL}/auth/register`;
export const LOGIN_URL = `${API_URL}/auth/login`;
