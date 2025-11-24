import express from 'express';
import { generateQuestions, getUserTopics, getTopicById, getStatistics, submitQuiz } from '../controllers/topicController.js';
import { authenticateUser } from '../middleware/authenticateUser.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// All topic routes require authentication
router.post('/generate', authenticateUser, asyncHandler(generateQuestions));
router.get('/statistics', authenticateUser, asyncHandler(getStatistics));
router.get('/all', authenticateUser, asyncHandler(getUserTopics));
router.get('/:id', authenticateUser, asyncHandler(getTopicById));
router.post('/:id/submit', authenticateUser, asyncHandler(submitQuiz));

export default router;

