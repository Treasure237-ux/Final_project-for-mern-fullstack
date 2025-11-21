import Topic from '../models/Topic.js';
import { generateObject } from 'ai';
import { groq } from '@ai-sdk/groq';
import { z } from 'zod';

// Define the schema for quiz questions using Zod
const QuizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.object({
        A: z.string(),
        B: z.string(),
        C: z.string(),
        D: z.string()
      }),
      correctAnswer: z.enum(['A', 'B', 'C', 'D'])
    })
  )
});

/**
 * Generate quiz questions using Groq AI API with @ai-sdk/groq
 * @route POST /api/topic/generate
 * @access Private
 */
export const generateQuestions = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both title and description'
      });
    }

    // Check if Groq API key is configured
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Groq API key is not configured'
      });
    }

    // Create prompt for Groq
    const prompt = `Generate exactly 10 multiple choice questions (MCQ) based on the following topic:

Topic Title: ${title}
Topic Description: ${description}

Requirements:
- Generate exactly 10 questions
- Each question should have 4 options labeled A, B, C, and D
- Each question should have one correct answer (A, B, C, or D)
- Questions should be well-formatted and educational`;

    // Call Groq AI API using @ai-sdk/groq and generateObject
    const { object } = await generateObject({
      model: groq('mixtral-8x7b-32768'),
      schema: QuizSchema,
      prompt,
      temperature: 0.7
    });

    // Validate the response structure
    if (!object.questions || !Array.isArray(object.questions)) {
      return res.status(500).json({
        success: false,
        message: 'Invalid response format from Groq'
      });
    }

    // Ensure we have exactly 10 questions
    const questions = object.questions.slice(0, 10).map(q => ({
      question: q.question,
      options: {
        A: q.options.A,
        B: q.options.B,
        C: q.options.C,
        D: q.options.D
      },
      correctAnswer: q.correctAnswer.toUpperCase()
    }));

    // Create and save topic
    const topic = await Topic.create({
      title,
      description,
      createdBy: userId,
      questions
    });

    res.status(201).json({
      success: true,
      message: 'Questions generated successfully',
      topic: {
        id: topic._id,
        title: topic.title,
        description: topic.description,
        questions: topic.questions,
        createdAt: topic.createdAt
      }
    });
  } catch (error) {
    console.error('Error generating questions:', error);

    res.status(500).json({
      success: false,
      message: error.message || 'Error generating questions'
    });
  }
};

/**
 * Get all topics created by the authenticated user
 * @route GET /api/topic/all
 * @access Private
 */
export const getUserTopics = async (req, res) => {
  try {
    const userId = req.user._id;

    const topics = await Topic.find({ createdBy: userId })
      .select('-questions')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      topics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching topics'
    });
  }
};

/**
 * Get a specific topic by ID with all questions
 * @route GET /api/topic/:id
 * @access Private
 */
export const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const topic = await Topic.findOne({ _id: id, createdBy: userId });

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.status(200).json({
      success: true,
      topic: {
        id: topic._id,
        title: topic.title,
        description: topic.description,
        questions: topic.questions,
        createdAt: topic.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching topic'
    });
  }
};

/**
 * Get quiz statistics for the authenticated user
 * @route GET /api/topic/statistics
 * @access Private
 */
export const getStatistics = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTopics = await Topic.countDocuments({ createdBy: userId });
    
    // Get recent topics (last 5)
    const recentTopics = await Topic.find({ createdBy: userId })
      .select('title createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      statistics: {
        totalTopics,
        recentTopics: recentTopics.map(topic => ({
          id: topic._id,
          title: topic.title,
          createdAt: topic.createdAt
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching statistics'
    });
  }
};

