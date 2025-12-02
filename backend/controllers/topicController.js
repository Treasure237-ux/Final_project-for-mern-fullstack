import Topic from '../models/Topic.js';
import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';

/**
 * Generate quiz questions using Groq AI API with @ai-sdk/groq
 * @route POST /api/topic/generate
 * @access Private
 */
export const generateQuestions = async (req, res) => {
  try {
    const { title, description, numberOfQuestions: numQuestionsInput } = req.body;
    const userId = req.user._id;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both title and description'
      });
    }

    // Validate and set number of questions, default to 10
    const numberOfQuestions = numQuestionsInput ? parseInt(numQuestionsInput, 10) : 10;

    // Add range validation for the number of questions
    if (isNaN(numberOfQuestions) || numberOfQuestions < 1 || numberOfQuestions > 20) {
      return res.status(400).json({
        success: false,
        message: 'Number of questions must be between 1 and 20.'
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
    const prompt = `Generate exactly ${numberOfQuestions} multiple choice questions (MCQ) based on the following topic:

Topic Title: ${title}
Topic Description: ${description}

Return ONLY valid JSON in this exact format, no markdown, no extra text:
{
  "questions": [
    {
      "question": "Question text here?",
      "options": {
        "A": "Option A text",
        "B": "Option B text",
        "C": "Option C text",
        "D": "Option D text"
      },
      "correctAnswer": "A"
    }
  ]
}

Requirements:
- Generate exactly ${numberOfQuestions} questions
- Each question must have 4 options (A, B, C, D)
- Each question must have exactly one correct answer (A, B, C, or D)
- Questions should be well-formatted and educational
- Return ONLY the JSON object, nothing else`;

    // Call Groq AI API using @ai-sdk/groq and generateText
    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates educational multiple choice questions. Always respond with valid JSON format only, no markdown, no extra text.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      maxTokens: 2000
    });

    // Parse the response
    let jsonContent = text.trim();
    
    // Remove markdown code blocks if present
    if (jsonContent.startsWith('```json')) {
      jsonContent = jsonContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    } else if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.replace(/```\n?/g, '').trim();
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('Failed to parse response:', jsonContent);
      return res.status(500).json({
        success: false,
        message: 'Failed to parse response from Groq. Invalid JSON format.'
      });
    }

    // Validate the response structure
    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions) || parsedResponse.questions.length === 0) {
      console.error('Invalid response structure:', parsedResponse);
      return res.status(500).json({
        success: false,
        message: 'Invalid response format from Groq'
      });
    }

    // Ensure we have exactly 10 questions
    // Only log raw AI responses in non-production for debugging. Avoid logging sensitive content in production.
    if (process.env.NODE_ENV !== 'production') {
      console.log('Raw parsed response:', JSON.stringify(parsedResponse, null, 2));
    }
    
    const questions = parsedResponse.questions.slice(0, numberOfQuestions).map((q, index) => {
      // Validate question structure
      if (!q.question) {
        console.error(`Question ${index} missing 'question' field:`, q);
        throw new Error(`Question ${index}: missing 'question' field`);
      }
      if (!q.options || typeof q.options !== 'object') {
        console.error(`Question ${index} missing or invalid 'options' field:`, q);
        throw new Error(`Question ${index}: missing or invalid 'options' field`);
      }
      if (!q.correctAnswer) {
        console.error(`Question ${index} missing 'correctAnswer' field:`, q);
        throw new Error(`Question ${index}: missing 'correctAnswer' field`);
      }

      return {
        question: q.question,
        options: {
          A: q.options.A || '',
          B: q.options.B || '',
          C: q.options.C || '',
          D: q.options.D || ''
        },
        correctAnswer: String(q.correctAnswer).toUpperCase()
      };
    });

    // Create and save topic
    const topic = await Topic.create({
      title,
      description,
      createdBy: userId,
      questions
    });

    // Return the created topic but DO NOT expose correct answers in the response
    const safeQuestions = topic.questions.map(q => ({
      question: q.question,
      options: q.options
    }));

    res.status(201).json({
      success: true,
      message: 'Questions generated successfully',
      topic: {
        id: topic._1d || topic._id,
        title: topic.title,
        description: topic.description,
        questions: safeQuestions,
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

    // Return topic WITHOUT correct answers so they are not exposed during the quiz
    const safeQuestions = topic.questions.map(q => ({
      question: q.question,
      options: q.options
    }));

    res.status(200).json({
      success: true,
      topic: {
        id: topic._id,
        title: topic.title,
        description: topic.description,
        questions: safeQuestions,
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
 * Submit quiz answers for grading
 * @route POST /api/topic/:id/submit
 * @access Private
 */
export const submitQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body; // expected: { "0": "A", "1": "C", ... }
    const userId = req.user._1d || req.user._id; // handle possible different naming

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ success: false, message: 'Answers are required' });
    }

    const topic = await Topic.findOne({ _id: id, createdBy: userId });
    if (!topic) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }

    // Grade answers
    const results = topic.questions.map((q, index) => {
      const userAnswer = answers[index] || null;
      const correct = String(q.correctAnswer).toUpperCase();
      const isCorrect = userAnswer && String(userAnswer).toUpperCase() === correct;

      return {
        question: q.question,
        options: q.options,
        correctAnswer: correct,
        userAnswer: userAnswer ? String(userAnswer).toUpperCase() : null,
        isCorrect
      };
    });

    const score = results.filter(r => r.isCorrect).length;

    // Return graded results (safe to include correct answers now)
    return res.status(200).json({
      success: true,
      score,
      total: results.length,
      results,
      topic: {
        id: topic._id,
        title: topic.title,
        description: topic.description,
        questions: results
      }
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return res.status(500).json({ success: false, message: error.message || 'Error submitting quiz' });
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
