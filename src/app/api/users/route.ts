import mongoose from 'mongoose';
import UserModel from '@/lib/models/users';
import { NextResponse } from 'next/server';
import { corsHeaders } from '@/lib/corsHeaders';

// ユーザー情報を取得
export async function POST(req: Request) {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING).catch();

  const { token } = await req.json();

  // ユーザー情報を取得
  const data = await UserModel.findOne({ token: token });

  if (!data) {
    return NextResponse.json(
      {
        message: 'A provided token has invalid',
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }

  // email,uuidを返還
  return NextResponse.json(
    {
      email: data.email,
      uuid: data.uuid,
      user_name: data.user_name,
    },
    {
      headers: corsHeaders,
    }
  );
}
