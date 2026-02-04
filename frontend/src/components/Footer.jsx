import { Link } from 'react-router-dom'
import BrandIcon from './BrandIcon'

function Footer() {
  return (
    <footer className="border-t border-gray-900/10 bg-white/70 backdrop-blur transition-colors duration-200 dark:border-gray-700/60 dark:bg-gray-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e85d3f]/10 text-[#e85d3f]">
                <BrandIcon className="h-4 w-4" />
              </span>
              Smart<span className="text-[#e85d3f]">Quiz</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Turn topics into structured notes, flashcards, and quizzes that feel effortless.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#e85d3f] dark:hover:text-[#ff7a5c] text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/topics"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#e85d3f] dark:hover:text-[#ff7a5c] text-sm transition-colors"
                >
                  My Topics
                </Link>
              </li>
              <li>
                <Link
                  to="/generate-quiz"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#e85d3f] dark:hover:text-[#ff7a5c] text-sm transition-colors"
                >
                  Generate Quiz
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Have questions? We'd love to hear from you.
            </p>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:tboyokirhie@gmail.com" className="text-[#2b59c3] hover:underline dark:text-blue-400">
                  tboyokirhie@gmail.com
                </a>
              </div>
              <div>
                <span className="font-semibold">GitHub:</span>{' '}
                <a
                  href="https://github.com/Treasure237-ux"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#2b59c3] hover:underline dark:text-blue-400"
                >
                  github.com/Treasure237-ux
                </a>
              </div>
              <div>
                <span className="font-semibold">Discord:</span>{' '}
                <span className="text-gray-600 dark:text-gray-300">@okirhie_treasure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-900/10 dark:border-gray-700/60">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} SmartQuiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
