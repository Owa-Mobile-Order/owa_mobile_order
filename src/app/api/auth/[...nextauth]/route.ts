import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import UserModel from '@/lib/models/users';
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
      const { email, name } = user;

      await mongoose.connect(process.env.DATABASE_CONNECTION_STRING).catch();

      const data = await UserModel.findOne({ email: email });

      if (!data) {
        UserModel.create({
          email: email,
          uuid: randomUUID(),
          token: randomUUID(),
          user_name: name,
        });
      }

      // if (!email?.endsWith("e.osakamanabi.jp")) return false;

      return true;
    },
    async session({ session }) {
      const { email, name } = session.user;

      await mongoose.connect(process.env.DATABASE_CONNECTION_STRING).catch();

      const data = await UserModel.findOne({ email: email });

      if (!data) {
        const token = randomUUID();

        UserModel.create({
          email: email,
          uuid: randomUUID(),
          token: token,
          user_name: name,
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
