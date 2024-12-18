import { Chapter } from '../models/Chapter.js';
import { Manga } from '../models/Manga.js';
import { User } from '../models/User.js';
import { Comment } from '../models/Comment.js';

export const getAllChapters = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const chapters = await Chapter.find({ manga: mangaId }).sort({ number: 1 });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapters', error });
  }
};

export const getChapterDetails = async (req, res) => {
  try {
    const { mangaId, chapterId } = req.params;
    const chapter = await Chapter.findOne({ _id: chapterId, manga: mangaId });
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapter details', error });
  }
};

export const readChapter = async (req, res) => {
  try {
    const { mangaId, chapterId } = req.params;
    const chapter = await Chapter.findOneAndUpdate(
      { _id: chapterId, manga: mangaId },
      { $inc: { readCount: 1 } },
      { new: true }
    );
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Update manga reads count
    await Manga.findByIdAndUpdate(mangaId, { $inc: { reads: 1 } });

    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Error reading chapter', error });
  }
};

export const toggleChapterRead = async (req, res) => {
  try {
    const { mangaId, chapterId } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const mangaProgress = user.readingProgress.find(p => p.manga.toString() === mangaId);
    if (mangaProgress) {
      const chapterIndex = mangaProgress.chaptersRead.indexOf(chapterId);
      if (chapterIndex > -1) {
        mangaProgress.chaptersRead.splice(chapterIndex, 1);
      } else {
        mangaProgress.chaptersRead.push(chapterId);
        mangaProgress.lastReadChapter = chapterId;
      }
    } else {
      user.readingProgress.push({
        manga: mangaId,
        chaptersRead: [chapterId],
        lastReadChapter: chapterId
      });
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling chapter read status', error });
  }
};

export const addComment = async (req, res) => {
  try {
    const { mangaId, chapterId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const newComment = new Comment({
      user: userId,
      content,
      chapter: chapterId
    });
    await newComment.save();

    const chapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { $push: { comments: newComment._id } },
      { new: true }
    ).populate('comments');

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId, user: userId },
      { content, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error editing comment', error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { mangaId, chapterId, commentId } = req.params;
    const userId = req.user.id;
    const deletedComment = await Comment.findOneAndDelete({ _id: commentId, user: userId });
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }
    const chapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { $pull: { comments: commentId } },
      { new: true }
    );
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};

export const reportChapterProblem = async (req, res) => {
  try {
    const { mangaId, chapterId } = req.params;
    const { problemType, description } = req.body;
    const userId = req.user.id;
    // Implement logic to handle the problem report
    // For example, create a new ProblemReport model and save the report
    res.json({ message: 'Problem reported successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error reporting problem', error });
  }
};

export const createChapter = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const chapterData = req.body;
    const newChapter = new Chapter({ ...chapterData, manga: mangaId });
    await newChapter.save();

    const manga = await Manga.findById(mangaId);
    if (!manga) {
      return res.status(404).json({ message: 'Manga not found' });
    }

    const updateData = { 
      $push: { chapters: newChapter._id },
      $inc: { chapterCount: 1 },
      $set: { 
        latestChapter: newChapter._id,
        lastChapterUpdated: new Date()
      }
    };

    // If this is the first chapter, set the firstChapterPublished date
    if (manga.chapterCount === 0) {
      updateData.$set.firstChapterPublished = new Date();
    }

    // Update languages
    newChapter.languages.forEach(lang => {
      if (!manga.languages.includes(lang.lang)) {
        updateData.$push = { ...updateData.$push, languages: lang.lang };
      }
    });

    const updatedManga = await Manga.findByIdAndUpdate(mangaId, updateData, { new: true });

    res.status(201).json({ chapter: newChapter, manga: updatedManga });
  } catch (error) {
    res.status(500).json({ message: 'Error creating chapter', error });
  }
};

export const updateChapter = async (req, res) => {
  try {
    const { mangaId, chapterId } = req.params;
    const updateData = req.body;
    
    const updatedChapter = await Chapter.findOneAndUpdate(
      { _id: chapterId, manga: mangaId },
      updateData,
      { new: true }
    );

    if (!updatedChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Update manga languages if necessary
    if (updateData.languages) {
      const manga = await Manga.findById(mangaId);
      const allChapterLanguages = await Chapter.distinct('languages.lang', { manga: mangaId });
      manga.languages = [...new Set(allChapterLanguages)];
      await manga.save();
    }

    res.json(updatedChapter);
  } catch (error) {
    res.status(500).json({ message: 'Error updating chapter', error });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const { mangaId, chapterId } = req.params;
    const deletedChapter = await Chapter.findOneAndDelete({ _id: chapterId, manga: mangaId });
    if (!deletedChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    const manga = await Manga.findById(mangaId);
    if (!manga) {
      return res.status(404).json({ message: 'Manga not found' });
    }

    // Update manga fields
    manga.chapters.pull(chapterId);
    manga.chapterCount -= 1;

    // Update languages
    const remainingChapters = await Chapter.find({ manga: mangaId });
    const remainingLanguages = new Set(remainingChapters.flatMap(chapter => chapter.languages.map(lang => lang.lang)));
    manga.languages = Array.from(remainingLanguages);

    // Update latestChapter if necessary
    if (manga.latestChapter.toString() === chapterId) {
      const latestChapter = await Chapter.findOne({ manga: mangaId }).sort({ number: -1 });
      if (latestChapter) {
        manga.latestChapter = latestChapter._id;
        manga.lastChapterUpdated = latestChapter.createdAt;
      } else {
        manga.latestChapter = null;
        manga.lastChapterUpdated = null;
      }
    }

    await manga.save();

    res.json({ deletedChapter, manga });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chapter', error });
  }
};

export const addChapterLanguage = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const languageData = req.body;
    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { $push: { languages: languageData } },
      { new: true }
    );
    if (!updatedChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Check if the language needs to be added to the manga's languages
    const manga = await Manga.findById(updatedChapter.manga);
    if (!manga.languages.includes(languageData.lang)) {
      await Manga.findByIdAndUpdate(manga._id, {
        $push: { languages: languageData.lang }
      });
    }

    res.json(updatedChapter);
  } catch (error) {
    res.status(500).json({ message: 'Error adding language to chapter', error });
  }
};

export const deleteChapterLanguage = async (req, res) => {
  try {
    const { chapterId, lang } = req.params;
    const updatedChapter = await Chapter.findOneAndUpdate(
      { _id: chapterId },
      { $pull: { languages: { lang } } },
      { new: true }
    );
    if (!updatedChapter) {
      return res.status(404).json({ message: 'Chapter or language not found' });
    }

    // Check if the language should be removed from the manga's languages
    const manga = await Manga.findById(updatedChapter.manga);
    const otherChaptersWithLanguage = await Chapter.findOne({
      manga: manga._id,
      'languages.lang': lang,
      _id: { $ne: chapterId }
    });

    if (!otherChaptersWithLanguage) {
      await Manga.findByIdAndUpdate(manga._id, {
        $pull: { languages: lang }
      });
    }

    res.json(updatedChapter);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting language from chapter', error });
  }
};

export const moderateComment = async (req, res) => {
  try {
    const { mangaId, chapterId, commentId } = req.params;
    const { action } = req.body; // 'approve', 'reject', 'delete'
    let update;
    if (action === 'delete') {
      update = { $pull: { comments: commentId } };
    } else {
      update = { $set: { 'comments.$[elem].status': action } };
    }
    const chapter = await Chapter.findOneAndUpdate(
      { _id: chapterId, manga: mangaId },
      update,
      { 
        arrayFilters: [{ 'elem._id': commentId }],
        new: true
      }
    );
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter or comment not found' });
    }
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Error moderating comment', error });
  }
};

export const getMostReadChapters = async (req, res) => {
  try {
    const mostReadChapters = await Chapter.find()
      .sort({ readCount: -1 })
      .limit(10)
      .populate('manga', 'title');
    res.json(mostReadChapters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching most read chapters', error });
  }
};

export const getRecentlyAddedChapters = async (req, res) => {
  try {
    const recentChapters = await Chapter.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('manga', 'title');
    res.json(recentChapters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recently added chapters', error });
  }
};

export const getRecommendedNextChapters = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('readingProgress.manga');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recommendedChapters = await Promise.all(user.readingProgress.map(async (progress) => {
      const nextChapter = await Chapter.findOne({
        manga: progress.manga._id,
        number: { $gt: progress.lastReadChapter.number }
      }).sort({ number: 1 });
      return nextChapter;
    }));

    

    res.json(recommendedChapters.filter(chapter => chapter !== null));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommended next chapters', error });
  }
};

export default {
  getAllChapters,
  getChapterDetails,
  readChapter,
  toggleChapterRead,
  addComment,
  editComment,
  deleteComment,
  reportChapterProblem,
  createChapter,
  updateChapter,
  deleteChapter,
  addChapterLanguage,
  deleteChapterLanguage,
  moderateComment,
  getMostReadChapters,
  getRecentlyAddedChapters,
  getRecommendedNextChapters,
};