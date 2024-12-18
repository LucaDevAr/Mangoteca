import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema({
  lang: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  pages: [{ type: String, required: true }],
  evenOrOdd: { type: String },
});

const chapterSchema = new mongoose.Schema({
  manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
  number: { type: Number, required: true },
  volume: { type: Number },
  releaseDate: { type: Date },
  readCount: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  languages: [languageSchema],
  coverImage: { type: String },
  backCoverImage: { type: String },
}, {
  timestamps: true,
});

chapterSchema.index({ manga: 1, number: 1 }, { unique: true });

export const Chapter = mongoose.model('Chapter', chapterSchema);