import { corsHeaders } from '@/lib/corsHeaders';
import MenuModel from '@/lib/models/menus';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING).catch();

  const data = await MenuModel.find();

  return NextResponse.json(data, {
    headers: corsHeaders,
  });
}
