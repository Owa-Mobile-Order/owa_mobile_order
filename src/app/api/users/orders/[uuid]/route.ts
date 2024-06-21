import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import HistoryModel from '@/app/lib/models/history';
import UserModel from '@/app/lib/models/users';

// オーダー履歴の取得
export async function GET(
  _req: Request,
  { params }: { params: { uuid: string } }
) {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING).catch();

  const { uuid } = params;

  // ユーザーデータの検索
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

  // 予約履歴を検索
  const data = await HistoryModel.find({ uuid: uuid })
    .limit(10)
    .sort({ createdAt: -1 });

  // データが存在しない場合空のリストを返す
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

  // 配列にして返還
  return NextResponse.json({
    history: data.map((history) => {
      return {
        name: history.name,
        timestamp: history.createdAt,
        isPending: history.pending,
        order_id: history.order_id,
      };
    }),
  });
}
