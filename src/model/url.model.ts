import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
  {
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
  { timestamps: true }
);

const URL = mongoose.model('url', urlSchema);

export default URL;
