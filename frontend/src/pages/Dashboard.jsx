import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/axios'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'
import BrandIcon from '../components/BrandIcon'

function Dashboard() {
  const [statistics, setStatistics] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { error: showError } = useToast()

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const response = await api.get('/topic/statistics')
      if (response.data.success) {
        setStatistics(response.data.statistics)
      }
    } catch (err) {
      showError('Failed to load statistics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader fullScreen />
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f2ea] dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -top-20 -left-10 h-64 w-64 rounded-full bg-[#ffe1d6] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#d6e5ff] opacity-70 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-900/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 dark:border-gray-700/60 dark:bg-gray-900/60 dark:text-gray-300">
              <BrandIcon className="h-4 w-4 text-[#e85d3f]" />
              Your study hub
            </div>
            <h1 className="font-display mt-4 text-4xl text-gray-900 dark:text-white">
              Welcome back, {user.name}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Here's your quiz summary and recent activity.
            </p>
          </div>
          <Link
            to="/generate-quiz"
            className="inline-flex items-center justify-center rounded-xl bg-[#e85d3f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#d54f35] dark:shadow-none"
          >
            Generate a new quiz
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-3xl border border-gray-900/10 bg-white/80 p-6 shadow-lg shadow-[var(--shadow)] dark:border-gray-700/60 dark:bg-gray-900/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Topics</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {statistics?.totalTopics || 0}
                </p>
              </div>
              <div className="bg-[#d6e5ff] text-[#2b59c3] p-3 rounded-2xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-900/10 bg-white/80 p-6 shadow-lg shadow-[var(--shadow)] dark:border-gray-700/60 dark:bg-gray-900/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quick Actions</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">2</p>
              </div>
              <div className="bg-[#d4f4e8] text-[#1a936f] p-3 rounded-2xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-900/10 bg-white/80 p-6 shadow-lg shadow-[var(--shadow)] dark:border-gray-700/60 dark:bg-gray-900/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent Quizzes</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {statistics?.recentTopics?.length || 0}
                </p>
              </div>
              <div className="bg-[#ffe1d6] text-[#e85d3f] p-3 rounded-2xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-gray-900/10 bg-white/80 p-6 shadow-lg shadow-[var(--shadow)] dark:border-gray-700/60 dark:bg-gray-900/70">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/generate-quiz"
                  className="flex items-center p-4 bg-[#d6e5ff]/60 dark:bg-blue-900/30 rounded-2xl hover:bg-[#d6e5ff] dark:hover:bg-blue-900/40 transition-colors group"
                >
                  <div className="bg-[#2b59c3] p-3 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Generate Quiz</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Create new questions</p>
                  </div>
                </Link>

                <Link
                  to="/topics"
                  className="flex items-center p-4 bg-[#d4f4e8]/60 dark:bg-emerald-900/30 rounded-2xl hover:bg-[#d4f4e8] dark:hover:bg-emerald-900/40 transition-colors group"
                >
                  <div className="bg-[#1a936f] p-3 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">My Topics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View all topics</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-900/10 bg-white/80 p-6 shadow-lg shadow-[var(--shadow)] dark:border-gray-700/60 dark:bg-gray-900/70">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Topics</h2>
              {statistics?.recentTopics && statistics.recentTopics.length > 0 ? (
                <div className="space-y-3">
                  {statistics.recentTopics.map((topic) => (
                    <Link
                      key={topic.id}
                      to={`/take-quiz/${topic.id}`}
                      className="flex items-center justify-between rounded-2xl border border-gray-900/5 bg-white/60 p-4 hover:bg-white/90 transition-colors group dark:border-gray-700/50 dark:bg-gray-900/60 dark:hover:bg-gray-900/80"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#2b59c3] dark:group-hover:text-blue-400 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {new Date(topic.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-[#2b59c3] dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                  No recent topics. Create your first quiz!
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-900/10 bg-white/80 p-6 shadow-lg shadow-[var(--shadow)] dark:border-gray-700/60 dark:bg-gray-900/70">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quiz Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#d6e5ff]/60 dark:bg-blue-900/30 rounded-2xl">
                  <span className="text-gray-700 dark:text-gray-300">Total Topics</span>
                  <span className="font-bold text-[#2b59c3] dark:text-blue-400">
                    {statistics?.totalTopics || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#d4f4e8]/60 dark:bg-emerald-900/30 rounded-2xl">
                  <span className="text-gray-700 dark:text-gray-300">Available Quizzes</span>
                  <span className="font-bold text-[#1a936f] dark:text-emerald-400">
                    {statistics?.totalTopics || 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-900/10 bg-white/80 p-6 shadow-lg shadow-[var(--shadow)] dark:border-gray-700/60 dark:bg-gray-900/70">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Study Tip</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Review one topic before creating a new quiz. The spacing boosts recall and keeps progress steady.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
