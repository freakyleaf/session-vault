import mongoose from 'mongoose';

import { MODEL_ARTIST } from '@shared-src/lib/constants';

const artistSchema = new mongoose.Schema({
  artistName: {
    required: true,
    trim: true,
    type: String,
    validate: {
      message: 'artistName must be a non-empty string',
      validator: (value: string) => value?.trim().length > 0,
    },
  },
  clerkId: {
    required: [true, 'clerkId is required'],
    type: String,
    validate: {
      message: 'clerkId must be a non-empty string',
      validator: (value: string) => value?.trim().length > 0,
    },
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
  isActive: {
    default: true,
    type: Boolean,
  },
  updatedAt: {
    default: Date.now,
    type: Date,
  },
});

// Add index for efficient queries by artist
artistSchema.index({ clerkId: 1 });

artistSchema.pre('save', function (next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

export const Artist = mongoose.model(MODEL_ARTIST, artistSchema);
