import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  type: { type: String, enum: ['genre', 'theme', 'format'], required: true },
  value: { type: String, required: true }
});

const mangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  tags: [tagSchema],
  demographic: { type: String, enum: ['shounen', 'shoujo', 'seinen', 'josei'], required: true },
  status: { 
    type: String, 
    enum: ['ongoing', 'completed', 'cancelled', 'hiatus'], 
    default: 'ongoing' 
  },
  publicationState: {
    type: String,
    enum: ['draft', 'submitted', 'published', 'rejected'],
    default: 'draft'
  },
  version: { type: Number, default: 1 },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  chapterCount: { type: Number, default: 0 },
  latestChapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  firstChapterPublished: { type: Date },
  lastChapterUpdated: { type: Date },
  coverImage: { type: String, required: true },
  bannerImage: { type: String },
  publishedAt: { type: Date },
  finishedAt: { type: Date },
  contentRating: { 
    type: String, 
    enum: ['safe', 'suggestive', 'erotica', 'pornographic'], 
    default: 'safe', 
    required: true 
  },
  reads: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  averageRating: { type: Number, default: 0 },
  relatedManga: [{
    manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
    relationshipType: { 
      type: String, 
      enum: ['prequel', 'sequel', 'side_story', 'spin_off', 'alternate_version', 'shared_universe'], 
      required: true 
    }
  }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  popularityScore: { type: Number, default: 0 },
  languages: [{ type: String }],
}, {
  timestamps: true,
});

mangaSchema.index({ title: 'text', description: 'text', 'tags.value': 'text' });
mangaSchema.index({ views: -1 });
mangaSchema.index({ averageRating: -1 });
mangaSchema.index({ popularityScore: -1 });

export const Manga = mongoose.model('Manga', mangaSchema);