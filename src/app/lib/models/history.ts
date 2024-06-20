import { Schema, Document, Model, models, model } from 'mongoose';

export interface HistoryDoc extends Document {
  name: string;
  uuid: string;
  pending: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const historySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    pending: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

interface HistoryModel extends Model<HistoryDoc> {}

export default models['History']
  ? (models['History'] as HistoryModel)
  : model<HistoryDoc, HistoryModel>('History', historySchema);

/*
{
  "name": "カレーライス",
  "price": 300,
  "img": "https://www.kaigo-antenna.jp/uploads/illustration/main_image/815/202107_035_s.jpg"
}
*/
