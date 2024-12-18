import mongoose from 'mongoose';

const readingProgressSchema = new mongoose.Schema({
  manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
  lastReadChapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  chaptersRead: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  lastReadPage: { type: Number, default: 1 },
  readingStatus: { type: String, enum: ['planning', 'reading', 'completed', 'dropped'], default: 'reading' },
});

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  isPublic: { type: Boolean, default: true },
  mangas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manga' }],
}, {
  timestamps: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
  readingProgress: [readingProgressSchema],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manga' }],
  lists: [listSchema],
  preferences: {
    contentFilter: { type: String, enum: ['safe', 'suggestive', 'erotica', 'pornographic'], default: 'safe' },
    notificationSettings: {
      newChapters: { type: Boolean, default: true },
      comments: { type: Boolean, default: true },
      messages: { type: Boolean, default: true },
    },
  },
  activityLog: [{
    action: { type: String, enum: ['read', 'rate', 'comment', 'bookmark'], required: true },
    manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    timestamp: { type: Date, default: Date.now },
  }],
}, {
  timestamps: true,
});

userSchema.index({ username: 'text', email: 'text' });

export const User = mongoose.model('User', userSchema);