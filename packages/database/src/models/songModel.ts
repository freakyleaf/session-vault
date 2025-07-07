import mongoose from 'mongoose';

import { Session } from '@database-src/models/sessionModel';

import {
  MODEL_ALBUM,
  MODEL_ARTIST,
  MODEL_SONG,
} from '@shared-src/lib/constants';

const songSchema = new mongoose.Schema({
  album: {
    ref: MODEL_ALBUM,
    type: mongoose.Schema.Types.ObjectId,
  },
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
  sessions: [Session],
  title: {
    required: true,
    trim: true,
    type: String,
  },
  updatedAt: {
    default: Date.now,
    type: Date,
  },
});

songSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const Song = mongoose.model(MODEL_SONG, songSchema);
