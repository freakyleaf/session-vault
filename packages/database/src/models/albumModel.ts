import mongoose from 'mongoose';

import {
  MODEL_ALBUM,
  MODEL_ARTIST,
  MODEL_SONG,
} from '@shared-src/lib/constants';

const albumSchema = new mongoose.Schema({
  artist: {
    ref: MODEL_ARTIST,
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
  isActive: {
    default: true,
    type: Boolean,
  },
  media: {
    image: String,
  },
  releaseDate: Date,
  songs: [
    {
      ref: MODEL_SONG,
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  title: {
    required: true,
    trim: true,
    type: String,
  },
  trackOrder: [
    {
      ref: MODEL_SONG,
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  updatedAt: {
    default: Date.now,
    type: Date,
  },
});

albumSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const Album = mongoose.model(MODEL_ALBUM, albumSchema);
