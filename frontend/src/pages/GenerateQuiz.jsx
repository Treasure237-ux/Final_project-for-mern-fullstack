import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/axios'
import { useToast } from '../context/ToastContext'
import BrandIcon from '../components/BrandIcon'

function GenerateQuiz() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    numberOfQuestions: 10
  })
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState(null)
  const navigate = useNavigate()
  const { success, error: showError } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setQuestions(null)

    try {
      const num = parseInt(formData.numberOfQuestions, 10) || 10
      if (isNaN(num) || num < 1 || num > 20) {
        showError('Number of questions must be between 1 and 20.')
        setLoading(false)
        return
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        numberOfQuestions: num
      }

      const response = await api.post('/topic/generate', payload)

      if (response.data.success) {
        success('Questions generated successfully! Redirecting to quiz...')
        const topicId = response.data.topic?.id || response.data.topic?._id
        if (topicId) {
          navigate(`/take-quiz/${topicId}`)
        } else {
          setQuestions(response.data.topic.questions)
        }
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to generate questions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f2ea] dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#ffe1d6] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#d6e5ff] opacity-70 blur-3xl" />

      <div className="relative max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-900/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 dark:border-gray-700/60 dark:bg-gray-900/60 dark:text-gray-300">
              <BrandIcon className="h-4 w-4 text-[#e85d3f]" />
              New quiz
            </div>
            <h1 className="font-display mt-4 text-3xl text-gray-900 dark:text-white">
              Generate Quiz Questions
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Provide a focused topic and let the system build your next study session.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-900/10 bg-white/80 p-8 shadow-2xl shadow-[var(--shadow)] backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/70">
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
                className="w-full rounded-2xl border border-gray-900/10 bg-white/90 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:border-[#2b59c3] focus:outline-none focus:ring-2 focus:ring-[#2b59c3]/30 dark:border-gray-700/60 dark:bg-gray-900/80 dark:text-white"
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
                className="w-full rounded-2xl border border-gray-900/10 bg-white/90 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:border-[#2b59c3] focus:outline-none focus:ring-2 focus:ring-[#2b59c3]/30 dark:border-gray-700/60 dark:bg-gray-900/80 dark:text-white"
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
                className="w-36 rounded-2xl border border-gray-900/10 bg-white/90 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#2b59c3] focus:outline-none focus:ring-2 focus:ring-[#2b59c3]/30 dark:border-gray-700/60 dark:bg-gray-900/80 dark:text-white"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">Choose between 1 and 20 questions.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#2b59c3] py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-[#244da8] disabled:opacity-50 disabled:cursor-not-allowed dark:shadow-none"
            >
              {loading ? 'Generating Questions...' : 'Generate Questions'}
            </button>
          </form>
        </div>

        {questions && questions.length > 0 && (
          <div className="mt-8 rounded-3xl border border-gray-900/10 bg-white/80 p-8 shadow-2xl shadow-[var(--shadow)] backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/70">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Generated Questions ({questions.length})
            </h2>
            <div className="space-y-6">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="border border-gray-900/10 dark:border-gray-700/60 rounded-2xl p-6 bg-white/70 dark:bg-gray-900/60"
                >
                  <div className="flex items-start mb-4">
                    <span className="bg-[#2b59c3] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
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
                        className={`p-3 rounded-2xl border ${
                          q.correctAnswer === option
                            ? 'bg-[#d4f4e8]/70 border-[#1a936f] text-[#1a936f]'
                            : 'bg-white/70 dark:bg-gray-900/60 border-gray-900/10 dark:border-gray-700/60 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="font-semibold mr-2">{option}:</span>
                        <span className={q.correctAnswer === option ? 'font-semibold' : ''}>
                          {q.options[option]}
                        </span>
                        {q.correctAnswer === option && (
                          <span className="ml-2 font-semibold">Correct</span>
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
  )
}

export default GenerateQuiz
