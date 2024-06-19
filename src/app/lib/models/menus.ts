import { Schema, model } from 'mongoose';

const MenuModel = model(
  'menu',
  new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
      unique: true,
    },
  })
);

export { MenuModel };
