import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/axios'
import { useToast } from '../context/ToastContext'
import QuizCard from '../components/QuizCard'
import Loader from '../components/Loader'
import BrandIcon from '../components/BrandIcon'

function TopicsList() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const { error: showError } = useToast()

  useEffect(() => {
    fetchTopics()
  }, [])

  const fetchTopics = async () => {
    try {
      setLoading(true)
      const response = await api.get('/topic/all')

      if (response.data.success) {
        setTopics(response.data.topics)
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to fetch topics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader fullScreen />
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f2ea] dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#ffe1d6] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#d6e5ff] opacity-70 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-900/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 dark:border-gray-700/60 dark:bg-gray-900/60 dark:text-gray-300">
              <BrandIcon className="h-4 w-4 text-[#e85d3f]" />
              Your library
            </div>
            <h1 className="font-display mt-4 text-3xl text-gray-900 dark:text-white">My Topics</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Review, revisit, and jump back into quizzes whenever you want.
            </p>
          </div>
          <Link
            to="/generate-quiz"
            className="inline-flex items-center justify-center rounded-xl bg-[#e85d3f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#d54f35] dark:shadow-none"
          >
            Generate New Quiz
          </Link>
        </div>

        <div className="rounded-3xl border border-gray-900/10 bg-white/80 p-8 shadow-2xl shadow-[var(--shadow)] backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/70">
          {topics.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                You have not created any topics yet.
              </p>
              <Link
                to="/generate-quiz"
                className="inline-flex items-center justify-center rounded-xl bg-[#2b59c3] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-[#244da8] dark:shadow-none"
              >
                Create Your First Quiz
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <QuizCard key={topic._id} topic={topic} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopicsList
