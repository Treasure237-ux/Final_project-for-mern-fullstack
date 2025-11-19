import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/axios';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error: showError } = useToast();
  
  const [topic, setTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchTopic();
  }, [id]);

  const fetchTopic = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/topic/${id}`);
      
      if (response.data.success) {
        setTopic(response.data.topic);
        // Initialize answers object
        const initialAnswers = {};
        response.data.topic.questions.forEach((_, index) => {
          initialAnswers[index] = null;
        });
        setAnswers(initialAnswers);
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to fetch topic');
      navigate('/topics');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (option) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: option
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < topic.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    topic.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!topic) {
    return null;
  }

  if (showResults) {
    const percentage = Math.round((score / topic.questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Quiz Results</h1>
          
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">{score}/{topic.questions.length}</div>
            <div className="text-2xl font-semibold text-gray-700 mb-2">{percentage}%</div>
            <div className="text-lg text-gray-600">
              {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good job!' : percentage >= 40 ? 'Not bad!' : 'Keep practicing!'}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Question Review</h2>
            {topic.questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-4 ${
                    isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                  }`}
                >
                  <div className="flex items-start mb-2">
                    <span className="bg-blue-600 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 text-sm">
                      {index + 1}
                    </span>
                    <p className="font-semibold text-gray-900 flex-1">{question.question}</p>
                  </div>
                  <div className="ml-8 space-y-1">
                    {['A', 'B', 'C', 'D'].map((option) => {
                      let optionClass = 'p-2 rounded';
                      if (option === question.correctAnswer) {
                        optionClass += ' bg-green-200 font-semibold';
                      } else if (option === userAnswer && !isCorrect) {
                        optionClass += ' bg-red-200 font-semibold';
                      } else {
                        optionClass += ' bg-gray-100';
                      }
                      
                      return (
                        <div key={option} className={optionClass}>
                          <span className="font-semibold mr-2">{option}:</span>
                          {question.options[option]}
                          {option === question.correctAnswer && (
                            <span className="ml-2 text-green-700">✓ Correct</span>
                          )}
                          {option === userAnswer && !isCorrect && (
                            <span className="ml-2 text-red-700">✗ Your Answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleRestart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => navigate('/topics')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200"
            >
              Back to Topics
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = topic.questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === topic.questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{topic.title}</h1>
            <p className="text-gray-600 text-sm">{topic.description}</p>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {topic.questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(((currentQuestionIndex + 1) / topic.questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / topic.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <div className="flex items-start mb-6">
              <span className="bg-blue-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                {currentQuestionIndex + 1}
              </span>
              <h2 className="text-xl font-semibold text-gray-900 flex-1">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="ml-14 space-y-3">
              {['A', 'B', 'C', 'D'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'border-blue-600 bg-blue-50 font-semibold'
                      : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <span className="font-semibold text-gray-700 mr-3">{option}:</span>
                  <span className="text-gray-900">{currentQuestion.options[option]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              {isLastQuestion ? 'Finish Quiz' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TakeQuiz;

