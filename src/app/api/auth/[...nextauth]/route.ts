import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import UserModel from '@/app/lib/models/users';
import { randomUUID } from 'crypto';
import mongoose from 'mongoose';

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email;

      await mongoose.connect(process.env.DATABASE_CONNECTION_STRING).catch()

      const data = await UserModel.findOne({ email: email });

      if (!data) {
        UserModel.create({
          email: email,
          uuid: randomUUID(),
          token: randomUUID(),
        });
      }

      // if (!email?.endsWith("e.osakamanabi.jp")) return false;

      return true;
    },
    async session({ session }) {
      const email = session.user.email;

      await mongoose.connect(process.env.DATABASE_CONNECTION_STRING).catch()

      const data = await UserModel.findOne({ email: email });

      if (!data) {
        const token = randomUUID();

        UserModel.create({
          email: email,
          uuid: randomUUID(),
          token: token,
        });

        session.user.token = token;
      } else {
        session.user.token = data.token;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
