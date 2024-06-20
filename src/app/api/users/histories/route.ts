import mongoose from 'mongoose';
import HistoryModel from '@/app/lib/models/history';
import UserModel from '@/app/lib/models/users';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING).catch();

  const { uuid } = await req.json();

  const user_data = await UserModel.findOne({ uuid: uuid });
  if (!user_data) {
    return NextResponse.json(
      {
        message: 'A provided uuid has invalid',
      },
      {
        status: 500,
      }
    );
  }

  const data = await HistoryModel.find({ uuid: uuid })
    .limit(10)
    .sort({ createdAt: -1 });

  if (!data) {
    return NextResponse.json(
      {
        history: [],
      },
      {
        status: 200,
      }
    );
  }

  return NextResponse.json({
    history: data.map((history) => {
      return {
        name: history.name,
        timestamp: history.createdAt,
        isPending: history.pending,
      };
    }),
  });
}
