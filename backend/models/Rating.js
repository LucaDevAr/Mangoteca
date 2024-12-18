import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
  score: { type: Number, required: true, min: 1, max: 10 },
  review: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ratingSchema.index({ user: 1, manga: 1 }, { unique: true });

export default ratingSchema;
export const Rating = mongoose.model('Rating', ratingSchema);