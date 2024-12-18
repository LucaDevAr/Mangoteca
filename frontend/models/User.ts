import mongoose, { Document, Model, Schema } from 'mongoose';

interface IReadingProgress {
  manga: mongoose.Types.ObjectId;
  lastReadChapter: mongoose.Types.ObjectId;
  chaptersRead: mongoose.Types.ObjectId[];
  lastReadPage: number;
  readingStatus: 'planning' | 'reading' | 'completed' | 'dropped';
}

interface IList {
  name: string;
  description?: string;
  isPublic: boolean;
  mangas: mongoose.Types.ObjectId[];
}

interface IActivityLog {
  action: 'read' | 'rate' | 'comment' | 'bookmark';
  manga: mongoose.Types.ObjectId;
  chapter?: mongoose.Types.ObjectId;
  timestamp: Date;
}

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  role: 'user' | 'moderator' | 'admin';
  readingProgress: IReadingProgress[];
  bookmarks: mongoose.Types.ObjectId[];
  lists: IList[];
  preferences: {
    contentFilter: 'safe' | 'suggestive' | 'erotica' | 'pornographic';
    notificationSettings: {
      newChapters: boolean;
      comments: boolean;
      messages: boolean;
    };
  };
  activityLog: IActivityLog[];
}

const readingProgressSchema = new Schema<IReadingProgress>({
  manga: { type: Schema.Types.ObjectId, ref: 'Manga' },
  lastReadChapter: { type: Schema.Types.ObjectId, ref: 'Chapter' },
  chaptersRead: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
  lastReadPage: { type: Number, default: 1 },
  readingStatus: { type: String, enum: ['planning', 'reading', 'completed', 'dropped'], default: 'reading' },
});

const listSchema = new Schema<IList>({
  name: { type: String, required: true },
  description: { type: String },
  isPublic: { type: Boolean, default: true },
  mangas: [{ type: Schema.Types.ObjectId, ref: 'Manga' }],
}, {
  timestamps: true,
});

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
  readingProgress: [readingProgressSchema],
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Manga' }],
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
    manga: { type: Schema.Types.ObjectId, ref: 'Manga' },
    chapter: { type: Schema.Types.ObjectId, ref: 'Chapter' },
    timestamp: { type: Date, default: Date.now },
  }],
}, {
  timestamps: true,
});

userSchema.index({ username: 'text', email: 'text' });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;