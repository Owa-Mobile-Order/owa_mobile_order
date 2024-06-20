import mongoose from 'mongoose';
import UserModel from '@/app/lib/models/users';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING).catch();

  const { token } = await req.json();

  const data = await UserModel.findOne({ token: token });

  if (!data) {
    return NextResponse.json(
      {
        message: 'A provided token has invalid',
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    email: data.email,
    uuid: data.uuid,
  });
}
