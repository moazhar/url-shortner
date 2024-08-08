import { Document, Schema, model } from 'mongoose';

export interface URL extends Document {
  userId: Schema.Types.ObjectId;
  short_id: string;
  redirect_url: string;
  visits?: {
    timestamp: Date;
  }[];
}

export const URLModel = model<URL>(
  'url',
  new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      short_id: {
        type: String,
        required: true,
        unique: true,
      },
      redirect_url: {
        type: String,
        required: true,
      },
      visits: [{ timestamp: Date }],
    },
    {
      timestamps: true,
    }
  )
);
