import { Schema, Document, Model, models, model } from 'mongoose';

export interface FeedBacksDoc extends Document {
  name: string;
  price: number;
  img: string;
}

const feedbacksSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

interface FeedBacksModel extends Model<FeedBacksDoc> {}

export default models['Menu']
  ? (models['Menu'] as FeedBacksModel)
  : model<FeedBacksDoc, FeedBacksModel>('FeedBacks', feedbacksSchema);
