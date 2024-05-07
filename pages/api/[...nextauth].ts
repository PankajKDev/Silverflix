import NextAuth from "next-auth/next"; //npm packages to install next-auth,bcrypt and @types/bcrypt
import prismadb from "@/lib/prismadb"; //importing nextauth,prismadb from local lib getting compare from bcrypt and credentials from next-auth/providers/credentials
import { compare } from "bcrypt";
import Credentials from "next-auth/providers/credentials";
export default NextAuth({
  providers: [
    //an array of authentication providers here it is a single array named Credentials
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
        async authorize(credentials) {
          //validating credentials
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and Password is required");
          }
          const user = await prismadb.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!user || !user.hashedPassword) {
            throw new Error("Email does not exist");
          }
          const isCorrectPassword = await compare(
            credentials.password,
            user.hashedPassword
          );
          if (!isCorrectPassword) {
            throw new Error("Incorrect password");
          }
          return user;
        },
      },
    }),
  ],
  pages: {
    //an object that defines the page for authentication, here Sign In is set to /auth
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development", //if env variable is set to development then debug mode will be on
  session: {
    //object defining session strategy  here it is json web token
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
