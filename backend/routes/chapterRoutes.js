import express from 'express';
import * as chapterController from '../controllers/chapterController.js';
// import { authMiddleware, adminMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/:mangaId', chapterController.getAllChapters);
router.get('/:mangaId/:chapterId', chapterController.getChapterDetails);
router.get('/:chapterId/read', chapterController.readChapter);

// Authenticated user routes
// router.use(authMiddleware);
router.post('/:chapterId/toggle-read', chapterController.toggleChapterRead);
router.post('/:chapterId/comment', chapterController.addComment);
router.put('/:chapterId/comment/:commentId', chapterController.editComment);
router.delete('/:chapterId/comment/:commentId', chapterController.deleteComment);
router.post('/:chapterId/report', chapterController.reportChapterProblem);

// Admin routes
// router.use(adminMiddleware);
router.post('/:mangaId', chapterController.createChapter);
router.put('/:chapterId', chapterController.updateChapter);
router.delete('/:mangaId/:chapterId', chapterController.deleteChapter);
router.post('/:chapterId/language', chapterController.addChapterLanguage);
router.delete('/:chapterId/language/:lang', chapterController.deleteChapterLanguage);
router.put('/:chapterId/moderate-comment/:commentId', chapterController.moderateComment);

// Algorithm routes
router.get('/most-read', chapterController.getMostReadChapters);
router.get('/recently-added', chapterController.getRecentlyAddedChapters);
router.get('/recommended-next/:userId', chapterController.getRecommendedNextChapters);

export default router;