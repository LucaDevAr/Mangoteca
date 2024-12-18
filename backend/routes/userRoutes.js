import express from 'express';
import * as userController from '../controllers/userController.js';
// import { authMiddleware, adminMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Authenticated user routes
// router.use(authMiddleware);
router.post('/logout', userController.logoutUser);
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.put('/change-password', userController.changePassword);
router.get('/reading-history', userController.getReadingHistory);
router.post('/reading-progress', userController.updateReadingProgress);
router.get('/bookmarks', userController.getBookmarks);
router.get('/lists', userController.getMangaLists);
router.post('/lists', userController.createMangaList);
router.put('/lists/:listId', userController.updateMangaList);
router.delete('/lists/:listId', userController.deleteMangaList);
router.post('/lists/:listId/manga/:mangaId', userController.addMangaToList);
router.delete('/lists/:listId/manga/:mangaId', userController.removeMangaFromList);
router.get('/notifications', userController.getNotifications);
router.put('/notifications/:notificationId/read', userController.markNotificationAsRead);
router.put('/preferences', userController.updateUserPreferences);
router.post('/manga/:mangaId/comments/:commentId/reply', userController.addCommentReply);
router.post('/manga/:mangaId/comments/:commentId/react', userController.toggleCommentReaction);

// Admin routes
// router.use(adminMiddleware);
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserDetails);
router.put('/users/:userId/role', userController.updateUserRole);
router.delete('/users/:userId', userController.deleteUser);
router.get('/statistics', userController.getUserStatistics);

// Algorithm routes
router.get('/most-active', userController.getMostActiveUsers);
router.get('/top-contributors', userController.getTopContributors);
// router.get('/recommendations', userController.getPersonalizedRecommendations);

export default router;