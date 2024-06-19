import MenuModel from '@/app/lib/models/menus';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);

  const data = await MenuModel.find();

  return NextResponse.json(data);
}
