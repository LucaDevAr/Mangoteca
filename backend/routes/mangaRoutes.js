import express from 'express';
import mangaController from '../controllers/mangaController.js';
// import { authMiddleware, adminMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/search', mangaController.searchManga);
router.get('/popular', mangaController.getPopularManga);
router.get('/latest-updates', mangaController.getLatestUpdates);
router.get('/new-releases', mangaController.getNewReleases);
router.get('/filter', mangaController.filterManga);
router.get('/:mangaId', mangaController.getMangaDetails);
router.get('/', mangaController.getAllMangas);

// User routes (require authentication)
// router.use(authMiddleware);
router.post('/:mangaId/rate', mangaController.rateManga);
router.post('/:mangaId/bookmark', mangaController.toggleBookmark);
router.post('/:mangaId/add-to-list', mangaController.addMangaToList);
router.delete('/:mangaId/remove-from-list', mangaController.removeMangaFromList);
router.get('/recommendations', mangaController.getPersonalizedRecommendations);

// Comment routes (require authentication)
router.post('/:mangaId/comments', mangaController.addComment);
router.put('/:mangaId/comments/:commentId', mangaController.editComment);
router.delete('/:mangaId/comments/:commentId', mangaController.deleteComment);

// Admin routes
// router.use(adminMiddleware);
router.post('/', mangaController.createManga);
router.put('/:mangaId', mangaController.updateManga);
router.delete('/:mangaId', mangaController.deleteManga);
router.patch('/:mangaId/publication-state', mangaController.updateMangaPublicationState);
router.post('/tags', mangaController.createMangaTag);
router.put('/tags/:tagId', mangaController.updateMangaTag);
router.delete('/tags/:tagId', mangaController.deleteMangaTag);
router.get('/:mangaId/statistics', mangaController.getMangaStatistics);

export default router; 