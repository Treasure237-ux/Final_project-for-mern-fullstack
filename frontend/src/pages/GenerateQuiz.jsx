import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { useToast } from '../context/ToastContext';

function GenerateQuiz() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    numberOfQuestions: 10
  });
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  // ProtectedRoute handles authentication, so we don't need to check here

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setQuestions(null);

    try {
      // Validate number on client before sending
      const num = parseInt(formData.numberOfQuestions, 10) || 10;
      if (isNaN(num) || num < 1 || num > 20) {
        showError('Number of questions must be between 1 and 20.');
        setLoading(false);
        return;
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        numberOfQuestions: num
      };

      const response = await api.post('/topic/generate', payload);

      if (response.data.success) {
        success('Questions generated successfully! Redirecting to quiz...');
        // Prefer explicit id field, fallback to _id
        const topicId = response.data.topic?.id || response.data.topic?._id;
        if (topicId) {
          navigate(`/take-quiz/${topicId}`);
        } else {
          // As a fallback, display questions on this page
          setQuestions(response.data.topic.questions);
        }
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Generate Quiz Questions</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topic Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., JavaScript Fundamentals"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topic Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the topic for which you want to generate questions..."
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="numberOfQuestions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Questions
              </label>
              <input
                type="number"
                id="numberOfQuestions"
                name="numberOfQuestions"
                min="1"
                max="20"
                value={formData.numberOfQuestions}
                onChange={handleChange}
                className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Choose between 1 and 20 questions.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Questions...
                </span>
              ) : (
                'Generate Questions'
              )}
            </button>
          </form>
        </div>

        {questions && questions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Generated Questions ({questions.length})
            </h2>
            <div className="space-y-6">
              {questions.map((q, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-start mb-4">
                    <span className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                      {q.question}
                    </p>
                  </div>
                  <div className="ml-11 space-y-2">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <div
                        key={option}
                        className={`p-3 rounded-md ${
                          q.correctAnswer === option
                            ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-400'
                            : 'bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500'
                        }`}
                      >
                        <span className="font-semibold text-gray-700 dark:text-gray-300 mr-2">
                          {option}:
                        </span>
                        <span className={q.correctAnswer === option ? 'text-green-800 dark:text-green-300 font-medium' : 'text-gray-700 dark:text-gray-300'}>
                          {q.options[option]}
                        </span>
                        {q.correctAnswer === option && (
                          <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">✓ Correct Answer</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerateQuiz;

