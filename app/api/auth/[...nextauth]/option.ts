import type { Account, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios, { AxiosError } from "axios";
import { LOGIN_URL } from "@/lib/Api";

// Custom session and user types
export interface CustomSession {
  user?: CustomUser;
  expires: string;
}

export interface CustomUser {
  id?: string | null;
  fullname?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        // Cast `user` to CustomUser so you can extend it
        const customUser = user as CustomUser;

        const payload = {
          email: customUser.email!,
          name: customUser.fullname ?? customUser.email ?? "",
          oauth_id: account?.providerAccountId!,
          provider: account?.provider!,
          image: customUser.image,
        };

        const { data } = await axios.post(LOGIN_URL, payload);

        customUser.id = data?.user?.id?.toString() ?? null;
        customUser.token = data?.user?.token ?? null;

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user as CustomUser;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};
