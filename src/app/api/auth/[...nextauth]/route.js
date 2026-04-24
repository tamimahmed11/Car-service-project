import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

const getEnv = (...keys) => keys.find((key) => process.env[key]) ? process.env[keys.find((key) => process.env[key])] : undefined;

const handler = NextAuth({
  secret: getEnv("NEXTAUTH_SECRET", "AUTH_SECRET", "NEXT_PUBLIC_AUTH_SECRET"),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    rolling: false,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        const db = await connectDB();
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          return null;
        }
        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null;
        }
        return currentUser;
      },
    }),
    GoogleProvider({
      clientId: getEnv("GOOGLE_CLIENT_ID", "NEXT_PUBLIC_GOOGLE_CLIENT_ID"),
      clientSecret: getEnv(
        "GOOGLE_CLIENT_SECRET",
        "NEXT_PUBLIC_GOOGLE_CLIENT_SECRET"
      ),
    }),
    GitHubProvider({
      clientId: getEnv("GITHUB_CLIENT_ID", "NEXT_PUBLIC_GITHUB_CLIENT_ID"),
      clientSecret: getEnv(
        "GITHUB_CLIENT_SECRET",
        "NEXT_PUBLIC_GITHUB_CLIENT_SECRET"
      ),
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (
        account?.provider === "google" ||
        account?.provider === "github" ||
        account?.provider === "facebook"
      ) {
        try {
          const db = await connectDB();
          const userCollection = db.collection("users");
          const userExist = await userCollection.findOne({ email: user.email });
          if (!userExist) {
            await userCollection.insertOne(user);
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      } else {
        return true;
      }
    },
  },
});

export { handler as GET, handler as POST };
