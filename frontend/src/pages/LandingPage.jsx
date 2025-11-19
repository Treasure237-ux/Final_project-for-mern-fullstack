import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-8">
          SmartQuiz is Live
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Create and take AI-powered quizzes to enhance your learning experience
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="inline-block bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-block bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 dark:hover:text-blue-600 transition duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

