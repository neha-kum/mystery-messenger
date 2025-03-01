import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const handler = NextAuth(authOptions); //give our options to NextAuth

export {handler as GET, handler as POST}