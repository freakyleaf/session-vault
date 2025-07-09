import mongoose from 'mongoose';

import { MODEL_ALBUM, MODEL_SONG } from '@shared-src/lib/constants';

const albumSchema = new mongoose.Schema({
  artistClerkId: {
    required: true,
    type: String,
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

// Add index for efficient queries by artist
albumSchema.index({ artistClerkId: 1 });

// Add compound index for active albums by artist
albumSchema.index({ artistClerkId: 1, isActive: 1 });

albumSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const Album = mongoose.model(MODEL_ALBUM, albumSchema);
