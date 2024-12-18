import { User } from '../models/User.js';
import { Manga } from '../models/Manga.js';
import { Chapter } from '../models/Chapter.js';
import { Notification } from '../models/Notification.js';
import { Comment } from '../models/Comment.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const logoutUser = (req, res) => {
  // Implement logout logic if necessary
  res.json({ message: 'Logged out successfully' });
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    ).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password', error });
  }
};

export const getReadingHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('readingProgress.manga');
    res.json(user.readingProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reading history', error });
  }
};

export const updateReadingProgress = async (req, res) => {
  try {
    const { mangaId, chapterId, lastReadPage, readingStatus } = req.body;
    const user = await User.findById(req.user.id);
    const progressIndex = user.readingProgress.findIndex(p => p.manga.toString() === mangaId);
    
    if (progressIndex > -1) {
      user.readingProgress[progressIndex].lastReadChapter = chapterId;
      user.readingProgress[progressIndex].lastReadPage = lastReadPage;
      user.readingProgress[progressIndex].readingStatus = readingStatus;
      user.readingProgress[progressIndex].chaptersRead.addToSet(chapterId);
    } else {
      user.readingProgress.push({
        manga: mangaId,
        lastReadChapter: chapterId,
        chaptersRead: [chapterId],
        lastReadPage,
        readingStatus
      });
    }
    
    await user.save();
    res.json({ message: 'Reading progress updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating reading progress', error });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('bookmarks');
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookmarks', error });
  }
};

export const getMangaLists = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('lists.mangas');
    res.json(user.lists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching manga lists', error });
  }
};

export const createMangaList = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    const user = await User.findById(req.user.id);
    user.lists.push({ name, description, isPublic });
    await user.save();
    res.status(201).json({ message: 'Manga list created successfully', list: user.lists[user.lists.length - 1] });
  } catch (error) {
    res.status(500).json({ message: 'Error creating manga list', error });
  }
};

export const updateMangaList = async (req, res) => {
  try {
    const { listId } = req.params;
    const { name, description, isPublic } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'lists._id': listId },
      { 
        $set: { 
          'lists.$.name': name,
          'lists.$.description': description,
          'lists.$.isPublic': isPublic
        }
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json({ message: 'Manga list updated successfully', list: user.lists.id(listId) });
  } catch (error) {
    res.status(500).json({ message: 'Error updating manga list', error });
  }
};

export const deleteMangaList = async (req, res) => {
  try {
    const { listId } = req.params;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { lists: { _id: listId } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json({ message: 'Manga list deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting manga list', error });
  }
};

export const addMangaToList = async (req, res) => {
  try {
    const { listId, mangaId } = req.params;
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'lists._id': listId },
      { $addToSet: { 'lists.$.mangas': mangaId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json({ message: 'Manga added to list successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding manga to list', error });
  }
};

export const removeMangaFromList = async (req, res) => {
  try {
    const { listId, mangaId } = req.params;
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'lists._id': listId },
      { $pull: { 'lists.$.mangas': mangaId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json({ message: 'Manga removed from list successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing manga from list', error });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('relatedManga', 'title')
      .populate('relatedChapter', 'number title');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: req.user.id },
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification as read', error });
  }
};

export const updateUserPreferences = async (req, res) => {
  try {
    const { contentFilter, notificationSettings } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        'preferences.contentFilter': contentFilter,
        'preferences.notificationSettings': notificationSettings
      },
      { new: true }
    );
    res.json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user preferences', error });
  }
};

export const addCommentReply = async (req, res) => {
  try {
    const { mangaId, commentId } = req.params;
    const { content } = req.body;
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, manga: mangaId },
      {
        $push: {
          replies: {
            user: req.user.id,
            content,
            createdAt: Date.now()
          }
        }
      },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment reply', error });
  }
};

export const toggleCommentReaction = async (req, res) => {
  try {
    const { mangaId, commentId } = req.params;
    const { reactionType } = req.body;
    const comment = await Comment.findOne({ _id: commentId, manga: mangaId });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    const reactionField = reactionType === 'like' ? 'likes' : 'dislikes';
    const oppositeReactionField = reactionType === 'like' ? 'dislikes' : 'likes';
    
    if (comment[reactionField].includes(req.user.id)) {
      comment[reactionField].pull(req.user.id);
    } else {
      comment[reactionField].addToSet(req.user.id);
      comment[oppositeReactionField].pull(req.user.id);
    }
    
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling comment reaction', error });
  }
};

// Admin controllers
export const getAllUsers = async (req, res) => {
  try {
    const users = await  User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

export const getUserStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ 'activityLog.0': { $exists: true } });
    const inactiveUsers = totalUsers - activeUsers;
    res.json({ totalUsers, activeUsers, inactiveUsers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user statistics', error });
  }
};

// Algorithm controllers
export const getMostActiveUsers = async (req, res) => {
  try {
    const mostActiveUsers = await User.aggregate([
      { $project: { username: 1, activityScore: { $size: '$activityLog' } } },
      { $sort: { activityScore: -1 } },
      { $limit: 10 }
    ]);
    res.json(mostActiveUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching most active users', error });
  }
};

export const getTopContributors = async (req, res) => {
  try {
    const topContributors = await User.aggregate([
      { $project: { username: 1, contributionScore: { $size: '$activityLog' } } },
      { $sort: { contributionScore: -1 } },
      { $limit: 10 }
    ]);
    res.json(topContributors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top contributors', error });
  }
};

export const getPersonalizedRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('readingProgress.manga');
    
    const genres = user.readingProgress.reduce((acc, progress) => {
      return [...acc, ...progress.manga.tags.filter(tag => tag.type === 'genre').map(tag => tag.value)];
    }, []);
    
    const genreCounts = genres.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});
    
    const topGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([genre]) => genre);
    
    const recommendations = await Manga.find({
      'tags.value': { $in: topGenres },
      _id: { $nin: user.readingProgress.map(p => p.manga._id) }
    })
      .sort({ popularityScore: -1 })
      .limit(10)
      .select('title coverImage');
    
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching personalized recommendations', error });
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  getReadingHistory,
  updateReadingProgress,
  getBookmarks,
  getMangaLists,
  createMangaList,
  updateMangaList,
  deleteMangaList,
  addMangaToList,
  removeMangaFromList,
  getNotifications,
  markNotificationAsRead,
  updateUserPreferences,
  addCommentReply,
  toggleCommentReaction,
  getAllUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
  getUserStatistics,
  getMostActiveUsers,
  getTopContributors,
  getPersonalizedRecommendations
};