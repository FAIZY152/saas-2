import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // Email/Password Provider
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Call API route for authentication
          const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (res.ok) {
            const user = await res.json();
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              provider: "credentials",
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // Handle sign in for Google OAuth
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Call API route to handle Google user
          const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/google-signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name || profile?.name,
              googleId: account.providerAccountId,
              avatar: user.image,
            }),
          });

          if (res.ok) {
            const userData = await res.json();
            user.id = userData.id;
          }
        } catch (error) {
          console.error("Google SignIn error:", error);
        }
      }
      return true;
    },

    // Handle JWT token
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider || user.provider;
      }
      return token;
    },

    // Handle session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.JWT_SECRET!,
});