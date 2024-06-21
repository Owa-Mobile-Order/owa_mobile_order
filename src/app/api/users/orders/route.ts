import mongoose from 'mongoose';
import HistoryModel from '@/app/lib/models/history';
import UserModel from '@/app/lib/models/users';
import { NextResponse } from 'next/server';
import { generateRandomCode } from '@/app/lib/functions/generateRandomCode';

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

  const code = generateRandomCode(8);

  // オーダーデータを作成
  const data = await HistoryModel.create({
    name: name,
    uuid: user_data.uuid,
    pending: false,
    order_id: code,
  });

  console.log(code);

  // オーダーデータの作成後リターン
  return NextResponse.json({
    message: 'A order has been created.',
    id: data._id,
    order_id: data.order_id,
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
