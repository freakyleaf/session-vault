import mongoose from 'mongoose';

import { MODEL_ARTIST } from '@shared-src/lib/constants';

const artistSchema = new mongoose.Schema({
  createdAt: {
    default: Date.now,
    type: Date,
  },
  email: {
    lowercase: true,
    required: true,
    type: String,
    unique: true,
  },
  isActive: {
    default: true,
    type: Boolean,
  },
  name: {
    required: true,
    trim: true,
    type: String,
  },
  updatedAt: {
    default: Date.now,
    type: Date,
  },
});

artistSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const Artist = mongoose.model(MODEL_ARTIST, artistSchema);
