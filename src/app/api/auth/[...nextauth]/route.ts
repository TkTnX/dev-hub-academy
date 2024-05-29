import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const authOptions = {
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET!,
    }),
    Github({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
