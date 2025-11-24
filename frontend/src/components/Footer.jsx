import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              SmartQuiz
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Create and take AI-powered quizzes to enhance your learning experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/topics"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                >
                  My Topics
                </Link>
              </li>
              <li>
                <Link
                  to="/generate-quiz"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                >
                  Generate Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
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
                <a href="mailto:tboyokirhie@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">tboyokirhie@gmail.com</a>
              </div>
              <div>
                <span className="font-semibold">GitHub:</span>{' '}
                <a href="https://github.com/Treasure237-ux" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">github.com/Treasure237-ux</a>
              </div>
              <div>
                <span className="font-semibold">Discord:</span>{' '}
                <span className="text-gray-600 dark:text-gray-300">@okirhie_treasure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} SmartQuiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

