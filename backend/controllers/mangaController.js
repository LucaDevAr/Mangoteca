import { Manga } from '../models/Manga.js';
import { User } from '../models/User.js';
import { Rating } from '../models/Rating.js';
import { Comment } from '../models/Comment.js';

// Public controllers
export const getMangaDetails = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const { includeComments, includeChapters, includeRatings, includeRelatedManga } = req.query;

    // Construir la consulta base
    let query = Manga.findById(mangaId);

    // Poblar según los parámetros
    if (includeComments === 'true') {
      query = query.populate('comments');
    }
    if (includeChapters === 'true') {
      query = query.populate('chapters');
    }
    if (includeRatings === 'true') {
      query = query.populate('ratings');
    }
    if (includeRelatedManga === 'true') {
      query = query.populate('relatedManga.manga');
    }

    const manga = await query.exec();

    if (!manga) {
      return res.status(404).json({ message: 'Manga not found' });
    }

    res.json(manga);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching manga details', error });
  }
};

export const searchManga = async (req, res) => {
  try {
    const { query } = req.query;
    let searchQuery = {};
    
    if (query) {
      searchQuery.title = { $regex: query, $options: 'i' };
    }
    
    const mangas = await Manga.find(searchQuery)
      .select('_id title')
      .limit(10);
    
    res.json({
      mangas
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching mangas', error });
  }
};

export const getPopularManga = async (req, res) => {
  try {
    const { includeComments, includeChapters } = req.query;

    let query = Manga.find({ publicationState: 'published' })
      .sort({ popularityScore: -1 })
      .limit(10);

    // Poblar según los parámetros
    if (includeComments === 'true') {
      query = query.populate('comments');
    }
    if (includeChapters === 'true') {
      query = query.populate('chapters');
    }

    const popularManga = await query.exec();
    res.json(popularManga);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular manga', error });
  }
};

export const getLatestUpdates = async (req, res) => {
  try {
    const { includeComments, includeChapters } = req.query;

    let query = Manga.find({ publicationState: 'published' })
      .sort({ lastChapterUpdated: -1 })
      .limit(20)
      .populate('latestChapter');

    // Populate based on parameters
    if (includeComments === 'true') {
      query = query.populate('comments');
    }
    if (includeChapters === 'true') {
      query = query.populate('chapters');
    }

    const latestUpdates = await query.exec();
    res.json(latestUpdates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest updates', error });
  }
};

export const getNewReleases = async (req, res) => {
  try {
    const { includeComments, includeChapters } = req.query;
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    let query = Manga.find({
      publicationState: 'published',
      publishedAt: { $gte: oneWeekAgo },
    }).sort({ publishedAt: -1 }).limit(10);

    // Poblar según los parámetros
    if (includeComments === 'true') {
      query = query.populate('comments');
    }
    if (includeChapters === 'true') {
      query = query.populate('chapters');
    }

    const newReleases = await query.exec();
    res.json(newReleases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching new releases', error });
  }
};

export const filterManga = async (req, res) => {
  try {
    const { genres, demographic, status, contentRating, includeComments, includeChapters, page = 1, limit = 20 } = req.query;
    let filterQuery = { publicationState: 'published' };

    if (genres) {
      filterQuery['tags.value'] = { $in: genres.split(',') };
    }
    if (demographic) {
      filterQuery.demographic = demographic;
    }
    if (status) {
      filterQuery.status = status;
    }
    if (contentRating) {
      filterQuery.contentRating = contentRating;
    }

    let query = Manga.find(filterQuery)
      .sort({ popularityScore: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    // Poblar según los parámetros
    if (includeComments === 'true') {
      query = query.populate('comments');
    }
    if (includeChapters === 'true') {
      query = query.populate('chapters');
    }

    const mangas = await query.exec();
    const total = await Manga.countDocuments(filterQuery);

    res.json({
      mangas,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalMangas: total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error filtering mangas', error });
  }
};

export const getAllMangas = async (req, res) => {
  try {
    const { includeComments, includeChapters } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    let query = Manga.find({})
      .skip(skip)
      .limit(limit);

    // Poblar según los parámetros
    if (includeComments === 'true') {
      query = query.populate('comments');
    }
    if (includeChapters === 'true') {
      query = query.populate('chapters');
    }

    const mangas = await query.lean().exec();
    const totalMangas = await Manga.countDocuments();
    const totalPages = Math.ceil(totalMangas / limit);

    res.status(200).json({
      mangas,
      currentPage: page,
      totalPages,
      totalMangas,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// User controllers
export const rateManga = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const { userId, score, review } = req.body;
    
    let rating = await Rating.findOne({ user: userId, manga: mangaId });
    
    if (rating) {
      rating.score = score;
      rating.review = review;
      rating.updatedAt = Date.now();
    } else {
      rating = new Rating({
        user: userId,
        manga: mangaId,
        score,
        review
      });
    }
    
    await rating.save();

    const manga = await Manga.findById(mangaId);
    const ratings = await Rating.find({ manga: mangaId });
    manga.averageRating = ratings.reduce((acc, curr) => acc + curr.score, 0) / ratings.length;
    await manga.save();
    
    res.json({ message: 'Rating saved successfully', rating });
  } catch (error) {
    res.status(500).json({ message: 'Error rating manga', error });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bookmarkIndex = user.bookmarks.indexOf(mangaId);
    if (bookmarkIndex > -1) {
      user.bookmarks.splice(bookmarkIndex, 1);
    } else {
      user.bookmarks.push(mangaId);
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling bookmark', error });
  }
};

export const addMangaToList = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const { userId, listName } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.mangaLists[listName]) {
      user.mangaLists[listName] = [];
    }
    if (!user.mangaLists[listName].includes(mangaId)) {
      user.mangaLists[listName].push(mangaId);
      await user.save();
    }
    res.json({ message: 'Manga added to list successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error adding manga to list', error });
  }
};

export const removeMangaFromList = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const { userId, listName } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.mangaLists[listName]) {
      user.mangaLists[listName] = user.mangaLists[listName].filter(id => id.toString() !== mangaId);
      await user.save();
    }
    res.json({ message: 'Manga removed from list successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error removing manga from list', error });
  }
};

export const getPersonalizedRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('readingProgress.manga');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const favoriteGenres = user.readingProgress.reduce((acc, progress) => {
      progress.manga.tags.forEach(tag => {
        if (tag.type === 'genre') {
          acc[tag.value] = (acc[tag.value] || 0) + 1;
        }
      });
      return acc;
    }, {});
    
    const topGenres = Object.entries(favoriteGenres)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([genre]) => genre);
    
    const recommendations = await Manga.find({
      'tags.value': { $in: topGenres },
      _id: { $nin: user.readingProgress.map(p => p.manga._id) },
      publicationState: 'published'
    }).sort({ popularityScore: -1 }).limit(10);
    
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error getting personalized recommendations', error });
  }
};

export const addComment = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const { userId, content } = req.body;
    const manga = await Manga.findById(mangaId);
    if (!manga) {
      return res.status(404).json({ message: 'Manga not found' });
    }
    const newComment = new Comment({
      user: userId,
      content,
      manga: mangaId
    });
    await newComment.save();
    manga.comments.push(newComment._id);
    await manga.save();
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

export const editComment = async (req, res) => {
  try {
    const { mangaId, commentId } = req.params;
    const { content } = req.body;
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, manga: mangaId },
      { content },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment updated successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { mangaId, commentId } = req.params;
    const comment = await Comment.findOneAndDelete({ _id: commentId, manga: mangaId });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await Manga.findByIdAndUpdate(mangaId, { $pull: { comments: commentId } });
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};

// Admin controllers
export const createManga = async (req, res) => {
  try {
    const mangaData = req.body;
    
    // Ensure title and description are in the correct format
    if (typeof mangaData.title === 'object' && mangaData.title.value) {
      mangaData.title = mangaData.title.value;
    }
    if (typeof mangaData.description === 'object' && mangaData.description.value) {
      mangaData.description = mangaData.description.value;
    }

    // Validate required fields
    const requiredFields = ['title', 'description', 'author', 'demographic', 'coverImage'];
    for (const field of requiredFields) {
      if (!mangaData[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    // Ensure tags is an array
    if (!Array.isArray(mangaData.tags)) {
      mangaData.tags = [];
    }

    // Convert dates to Date objects
    if (mangaData.publishedAt) {
      mangaData.publishedAt = new Date(mangaData.publishedAt);
    }
    if (mangaData.finishedAt) {
      mangaData.finishedAt = new Date(mangaData.finishedAt);
    }

    // Initialize ratings as an empty array
    mangaData.ratings = [];

    const newManga = new Manga(mangaData);
    await newManga.save();
    res.status(201).json({ message: 'Manga created successfully', manga: newManga });
  } catch (error) {
    console.error('Error creating manga:', error);
    res.status(500).json({ message: 'Error creating manga', error: error.message });
  }
};

export const updateManga = async (req, res) => {
  try {
    const updatedManga = await Manga.findByIdAndUpdate(req.params.mangaId, req.body, { new: true });
    if (!updatedManga) {
      return res.status(404).json({ message: 'Manga not found' });
    }
    res.json({ message: 'Manga updated successfully', manga: updatedManga });
  } catch (error) {
    res.status(500).json({ message: 'Error updating manga', error });
  }
};

export const deleteManga = async  (req, res) => {
  try {
    const deletedManga = await Manga.findByIdAndDelete(req.params.mangaId);
    if (!deletedManga) {
      return res.status(404).json({ message: 'Manga not found' });
    }
    res.json({ message: 'Manga deleted successfully', manga: deletedManga });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting manga', error });
  }
};

export const updateMangaPublicationState = async (req, res) => {
  try {
    const { publicationState } = req.body;
    const updatedManga = await Manga.findByIdAndUpdate(
      req.params.mangaId,
      { publicationState },
      { new: true }
    );
    if (!updatedManga) {
      return res.status(404).json({ message: 'Manga not found' });
    }
    res.json({ message: 'Publication state updated', manga: updatedManga });
  } catch (error) {
    res.status(500).json({ message: 'Error updating publication state', error });
  }
};

export const createMangaTag = async (req, res) => {
  try {
    const { type, value } = req.body;
    const manga = await Manga.findById(req.params.mangaId);
    if (!manga) {
      return res.status(404).json({ message: 'Manga not found' });
    }
    manga.tags.push({ type, value });
    await manga.save();
    res.status(201).json({ message: 'Tag created successfully', manga });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tag', error });
  }
};

export const updateMangaTag = async (req, res) => {
  try {
    const { type, value } = req.body;
    const manga = await Manga.findOneAndUpdate(
      { _id: req.params.mangaId, 'tags._id': req.params.tagId },
      { $set: { 'tags.$.type': type, 'tags.$.value': value } },
      { new: true }
    );
    if (!manga) {
      return res.status(404).json({ message: 'Manga or tag not found' });
    }
    res.json({ message: 'Tag updated successfully', manga });
  } catch (error) {
    res.status(500).json({ message: 'Error updating tag', error });
  }
};

export const deleteMangaTag = async (req, res) => {
  try {
    const manga = await Manga.findByIdAndUpdate(
      req.params.mangaId,
      { $pull: { tags: { _id: req.params.tagId } } },
      { new: true }
    );
    if (!manga) {
      return res.status(404).json({ message: 'Manga or tag not found' });
    }
    res.json({ message: 'Tag deleted successfully', manga });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tag', error });
  }
};

export const getMangaStatistics = async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.mangaId);
    if (!manga) {
      return res.status(404).json({ message: 'Manga not found' });
    }
    const statistics = {
      views: manga.views,
      readCount: manga.readCount,
      averageRating: manga.averageRating,
      bookmarkCount: manga.bookmarkedBy.length,
      chapterCount: manga.chapterCount,
    };
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: 'Error getting manga statistics', error });
  }
};

export default {
  // Public controllers
  getMangaDetails,
  searchManga,
  getPopularManga,
  getLatestUpdates,
  getNewReleases,
  filterManga,
  getAllMangas,
  
  // User controllers
  rateManga,
  toggleBookmark,
  addMangaToList,
  removeMangaFromList,
  getPersonalizedRecommendations,
  addComment,
  editComment,
  deleteComment,
  
  // Admin controllers
  createManga,
  updateManga,
  deleteManga,
  updateMangaPublicationState,
  createMangaTag,
  updateMangaTag,
  deleteMangaTag,
  getMangaStatistics
};