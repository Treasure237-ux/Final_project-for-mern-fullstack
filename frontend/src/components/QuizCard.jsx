import { Link } from 'react-router-dom'
import BrandIcon from './BrandIcon'

function QuizCard({ topic }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="rounded-3xl border border-gray-900/10 bg-white/80 p-6 shadow-lg shadow-[var(--shadow)] transition-transform duration-200 hover:-translate-y-1 dark:border-gray-700/60 dark:bg-gray-900/70">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {topic.title}
        </h3>
        <div className="ml-4 flex-shrink-0">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#d6e5ff] px-2.5 py-1 text-xs font-semibold text-[#2b59c3]">
            <BrandIcon className="h-3 w-3" />
            {topic.questions?.length || 0} Qs
          </span>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
        {topic.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Created {formatDate(topic.createdAt)}
        </div>
        <Link
          to={`/take-quiz/${topic._id}`}
          className="inline-flex items-center rounded-xl bg-[#2b59c3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#244da8]"
        >
          Take Quiz
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default QuizCard
