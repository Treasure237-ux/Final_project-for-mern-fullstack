import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/axios';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import BrandIcon from '../components/BrandIcon';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      
      if (response.data.success) {
        // Use AuthContext to store user and token
        login(response.data.user, response.data.token);
        
        success('Login successful!');
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f2ea] dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#ffe1d6] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#d6e5ff] opacity-70 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-gray-900/10 bg-white/80 p-10 shadow-2xl shadow-[var(--shadow)] backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/70">
          <div className="text-center">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e85d3f]/10 text-[#e85d3f]">
              <BrandIcon className="h-6 w-6" />
            </span>
            <h2 className="font-display mt-5 text-3xl text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Or{' '}
              <Link to="/register" className="font-semibold text-[#2b59c3] hover:text-[#244da8]">
                create a new account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-2xl border border-gray-900/10 bg-white/90 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:border-[#2b59c3] focus:outline-none focus:ring-2 focus:ring-[#2b59c3]/30 dark:border-gray-700/60 dark:bg-gray-900/80 dark:text-white"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-2xl border border-gray-900/10 bg-white/90 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:border-[#2b59c3] focus:outline-none focus:ring-2 focus:ring-[#2b59c3]/30 dark:border-gray-700/60 dark:bg-gray-900/80 dark:text-white"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#2b59c3] py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-[#244da8] disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-none"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

