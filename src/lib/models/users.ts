import { Schema, Document, Model, models, model } from 'mongoose';

export interface UserDoc extends Document {
  email: string;
  uuid: string;
  token: string;
  user_name: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
});

interface UserModel extends Model<UserDoc> {}

export default models['User']
  ? (models['User'] as UserModel)
  : model<UserDoc, UserModel>('User', userSchema);

/*
{
  "name": "カレーライス",
  "price": 300,
  "img": "https://www.kaigo-antenna.jp/uploads/illustration/main_image/815/202107_035_s.jpg"
}
*/
