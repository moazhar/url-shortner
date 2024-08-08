import { Document, model, Schema } from 'mongoose';

export interface User extends Document {
  first_name?: string;
  last_name: string;
  email: string;
  password: string;
}

export const UserModel = model<User>(
  'user',
  new Schema(
    {
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
