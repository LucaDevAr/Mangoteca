import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  content: { type: String, required: true },
  relatedManga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
  relatedChapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Notification = mongoose.model('Notification', notificationSchema);