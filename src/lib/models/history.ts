import { Schema, Document, Model, models, model } from 'mongoose';

export interface HistoryDoc extends Document {
  name: string;
  order_id: string;
  uuid: string;
  pending: boolean;
  createdAt: Date;
  updatedAt: Date;
  user_name: string;
}

const historySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    order_id: {
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
    user_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

historySchema.index({ name: 1 }, { unique: false });

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
