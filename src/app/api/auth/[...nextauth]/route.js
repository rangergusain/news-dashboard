// src/app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin", // Custom sign-in page
    },
    session: {
        strategy: "jwt", // Use JWT for session handling
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
