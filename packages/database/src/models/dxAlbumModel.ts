import mongoose from 'mongoose';

import { MODEL_ALBUM, MODEL_SONG } from '@shared-src/lib/constants';

import type { IAlbum } from '@shared-src/lib/interfaces';

const albumSchema = new mongoose.Schema(
  {
    artistClerkId: {
      index: true,
      required: [true, 'artistClerkId is required'],
      type: String,
      validate: {
        message: 'artistClerkId must be a non-empty string',
        validator: (value: string) => value?.trim().length > 0,
      },
    },
    createdAt: {
      default: Date.now,
      type: Date,
    },
    isPublic: {
      default: false,
      type: Boolean,
    },
    releaseDate: Date,
    songs: [
      {
        ref: MODEL_SONG,
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    title: {
      maxlength: [200, 'Album title cannot exceed 200 characters'],
      minlength: [1, 'Album title must be at least 1 character'],
      required: [true, 'Album title is required'],
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Add index for efficient queries by artist
albumSchema.index({ artistClerkId: 1 });

albumSchema.pre('save', function (next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

export const Album = mongoose.model<IAlbum>(MODEL_ALBUM, albumSchema);
