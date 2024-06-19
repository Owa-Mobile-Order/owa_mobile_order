import { Schema, Document, Model, models, model } from 'mongoose';

export interface MenuDoc extends Document {
  name: string;
  price: number;
  img: string;
}

const menuSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

interface MenuModel extends Model<MenuDoc> {}

export default models['Menu']
  ? (models['Menu'] as MenuModel)
  : model<MenuDoc, MenuModel>('Menu', menuSchema);

/*
{
  "name": "カレーライス",
  "price": 300,
  "img": "https://www.kaigo-antenna.jp/uploads/illustration/main_image/815/202107_035_s.jpg"
}
*/
