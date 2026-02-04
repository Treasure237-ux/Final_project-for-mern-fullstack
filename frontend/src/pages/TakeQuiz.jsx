import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../utils/axios'
import { useToast } from '../context/ToastContext'
import Loader from '../components/Loader'
import BrandIcon from '../components/BrandIcon'

function TakeQuiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { error: showError } = useToast()

  const [topic, setTopic] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    fetchTopic()
  }, [id])

  const fetchTopic = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/topic/${id}`)

      if (response.data.success) {
        setTopic(response.data.topic)
        const initialAnswers = {}
        response.data.topic.questions.forEach((_, index) => {
          initialAnswers[index] = null
        })
        setAnswers(initialAnswers)
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to fetch topic')
      navigate('/topics')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (option) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: option
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < topic.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      submitAnswers()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const submitAnswers = async () => {
    try {
      setLoading(true)
      const response = await api.post(`/topic/${id}/submit`, { answers })
      if (response.data.success) {
        setTopic(response.data.topic)
        setScore(response.data.score)
        setShowResults(true)
      } else {
        showError(response.data.message || 'Failed to submit answers')
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to submit answers')
    } finally {
      setLoading(false)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
    setScore(0)
  }

  if (loading) {
    return <Loader fullScreen />
  }

  if (!topic) {
    return null
  }

  if (showResults) {
    const percentage = Math.round((score / topic.questions.length) * 100)
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#f7f2ea] dark:bg-gray-950 flex items-center justify-center py-12 px-4">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#ffe1d6] opacity-70 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#d6e5ff] opacity-70 blur-3xl" />

        <div className="relative w-full max-w-3xl rounded-3xl border border-gray-900/10 bg-white/80 p-8 shadow-2xl shadow-[var(--shadow)] backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/70">
          <div className="text-center mb-8">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e85d3f]/10 text-[#e85d3f]">
              <BrandIcon className="h-6 w-6" />
            </span>
            <h1 className="font-display mt-4 text-3xl text-gray-900 dark:text-white">Quiz Results</h1>
          </div>

          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-[#2b59c3] mb-2">
              {score}/{topic.questions.length}
            </div>
            <div className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              {percentage}%
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-300">
              {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good job!' : percentage >= 40 ? 'Not bad!' : 'Keep practicing!'}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Question Review</h2>
            {topic.questions.map((question, index) => {
              const userAnswer = answers[index]
              const isCorrect = userAnswer === question.correctAnswer

              return (
                <div
                  key={index}
                  className={`border-2 rounded-2xl p-4 ${
                    isCorrect
                      ? 'border-[#1a936f] bg-[#d4f4e8]/70'
                      : 'border-[#e85d3f] bg-[#ffe1d6]/60'
                  }`}
                >
                  <div className="flex items-start mb-2">
                    <span className="bg-[#2b59c3] text-white font-bold rounded-full w-7 h-7 flex items-center justify-center mr-2 flex-shrink-0 text-sm">
                      {index + 1}
                    </span>
                    <p className="font-semibold text-gray-900 dark:text-white flex-1">{question.question}</p>
                  </div>
                  <div className="ml-9 space-y-1">
                    {['A', 'B', 'C', 'D'].map((option) => {
                      let optionClass = 'p-2 rounded-xl border '
                      if (option === question.correctAnswer) {
                        optionClass += 'bg-[#d4f4e8]/80 border-[#1a936f] font-semibold'
                      } else if (option === userAnswer && !isCorrect) {
                        optionClass += 'bg-[#ffe1d6]/80 border-[#e85d3f] font-semibold'
                      } else {
                        optionClass += 'bg-white/70 border-gray-900/10 dark:bg-gray-900/60 dark:border-gray-700/60'
                      }

                      return (
                        <div key={option} className={optionClass}>
                          <span className="font-semibold mr-2">{option}:</span>
                          {question.options[option]}
                          {option === question.correctAnswer && (
                            <span className="ml-2 text-[#1a936f] font-semibold">Correct</span>
                          )}
                          {option === userAnswer && !isCorrect && (
                            <span className="ml-2 text-[#e85d3f] font-semibold">Your Answer</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleRestart}
              className="flex-1 rounded-xl bg-[#2b59c3] py-3 px-6 text-sm font-semibold text-white transition hover:bg-[#244da8]"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => navigate('/topics')}
              className="flex-1 rounded-xl bg-gray-800 py-3 px-6 text-sm font-semibold text-white transition hover:bg-gray-900"
            >
              Back to Topics
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = topic.questions[currentQuestionIndex]
  const selectedAnswer = answers[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === topic.questions.length - 1

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f2ea] dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#ffe1d6] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#d6e5ff] opacity-70 blur-3xl" />

      <div className="relative max-w-3xl mx-auto rounded-3xl border border-gray-900/10 bg-white/80 p-8 shadow-2xl shadow-[var(--shadow)] backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/70">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-900/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 dark:border-gray-700/60 dark:bg-gray-900/60 dark:text-gray-300">
            <BrandIcon className="h-4 w-4 text-[#e85d3f]" />
            Quiz session
          </div>
          <h1 className="font-display mt-4 text-2xl text-gray-900 dark:text-white">{topic.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{topic.description}</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question {currentQuestionIndex + 1} of {topic.questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(((currentQuestionIndex + 1) / topic.questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200/70 rounded-full h-2">
            <div
              className="bg-[#2b59c3] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / topic.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-start mb-6">
            <span className="bg-[#2b59c3] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
              {currentQuestionIndex + 1}
            </span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex-1">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="ml-14 space-y-3">
            {['A', 'B', 'C', 'D'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? 'border-[#2b59c3] bg-[#d6e5ff]/70 font-semibold'
                    : 'border-gray-900/10 bg-white/70 hover:border-[#2b59c3]/60 hover:bg-[#d6e5ff]/40 dark:border-gray-700/60 dark:bg-gray-900/60'
                }`}
              >
                <span className="font-semibold text-gray-700 dark:text-gray-200 mr-3">{option}:</span>
                <span className="text-gray-900 dark:text-white">{currentQuestion.options[option]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="rounded-xl bg-gray-600 py-2 px-6 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="rounded-xl bg-[#2b59c3] py-2 px-6 text-sm font-semibold text-white transition hover:bg-[#244da8] disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TakeQuiz
