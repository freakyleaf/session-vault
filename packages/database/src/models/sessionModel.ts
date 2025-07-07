import mongoose from 'mongoose';

import { MODEL_SESSION } from '@shared-src/lib/constants';

const sessionSchema = new mongoose.Schema({
  channelCount: {
    min: 1,
    type: Number,
  },
  created: {
    default: Date.now,
    type: Date,
  },
  media: {
    audio: [String],
    images: [String],
    video: [String],
  },
  notes: [
    {
      note: String,
      timestamp: {
        default: Date.now,
        type: Date,
      },
    },
  ],
  projectSizeKb: {
    min: 0,
    type: Number,
  },
  sessionDuration: {
    min: 0,
    type: Number,
  },
});

export const Session = mongoose.model(MODEL_SESSION, sessionSchema);
