import mongoose from 'mongoose';
import HistoryModel from '@/app/lib/models/history';
import UserModel from '@/app/lib/models/users';
import { NextResponse } from 'next/server';

// 注文データの作成
export async function POST(req: Request) {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING).catch();

  // 情報をBodyから取得する
  const { token, name } = await req.json();

  // ユーザーデータを検索
  const user_data = await UserModel.findOne({ token: token });
  if (!user_data) {
    return NextResponse.json(
      {
        message: 'A provided token has invalid',
      },
      {
        status: 500,
      }
    );
  }

  // オーダーデータを作成
  const data = await HistoryModel.create({
    name: name,
    uuid: user_data.uuid,
    pending: false,
  });

  // オーダーデータの作成後リターン
  return NextResponse.json({
    message: 'A order has been created.',
    id: data._id,
  });
}

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
      };
    }),
  });
}

// 注文状態を変更
export async function PUT(req: Request) {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING).catch();

  // 情報をBodyから取得する
  const { id, state } = await req.json();

  const data = await HistoryModel.findOne({ _id: id });
  if (!data) {
    return NextResponse.json(
      {
        message: 'The specified order does not exist.',
      },
      {
        status: 404,
      }
    );
  }

  data.pending = state;
  await data.save();

  return NextResponse.json({
    state: state,
  });
}
