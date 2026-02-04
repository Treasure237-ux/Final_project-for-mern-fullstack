import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import BrandIcon from './BrandIcon';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { success } = useToast();
  const { user, logout: authLogout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    authLogout();
    success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-900/10 bg-white/70 shadow-sm backdrop-blur transition-colors duration-200 dark:border-gray-700/60 dark:bg-gray-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#e85d3f]/10 text-[#e85d3f]">
              <BrandIcon className="h-5 w-5" />
            </span>
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              Smart<span className="text-[#e85d3f]">Quiz</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-[#e85d3f] dark:hover:text-[#ff7a5c] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/topics"
                  className="text-gray-700 dark:text-gray-300 hover:text-[#e85d3f] dark:hover:text-[#ff7a5c] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  My Topics
                </Link>
                <Link
                  to="/generate-quiz"
                  className="text-gray-700 dark:text-gray-300 hover:text-[#e85d3f] dark:hover:text-[#ff7a5c] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Generate Quiz
                </Link>
                {user && (
                  <span className="text-gray-700 dark:text-gray-300 px-3 py-2 text-sm font-medium">
                    {user.name}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-[#e85d3f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d54f35]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-[#e85d3f] dark:hover:text-[#ff7a5c] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-[#2b59c3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#244da8]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="mt-2 rounded-2xl border border-gray-900/10 bg-white/80 p-4 shadow-lg shadow-[var(--shadow)] dark:border-gray-700/60 dark:bg-gray-900/70">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#e85d3f]"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/topics"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#e85d3f]"
                  >
                    My Topics
                  </Link>
                  <Link
                    to="/generate-quiz"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#e85d3f]"
                  >
                    Generate Quiz
                  </Link>
                  {user && (
                    <span className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                      {user.name}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="rounded-xl bg-[#e85d3f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d54f35]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#e85d3f]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl bg-[#2b59c3] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#244da8]"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

