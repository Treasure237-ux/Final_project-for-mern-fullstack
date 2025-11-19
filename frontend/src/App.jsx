import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DarkModeProvider } from './context/DarkModeContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import GenerateQuiz from './pages/GenerateQuiz'
import TopicsList from './pages/TopicsList'
import TakeQuiz from './pages/TakeQuiz'

function App() {
  return (
    <DarkModeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/generate-quiz" 
                    element={
                      <ProtectedRoute>
                        <GenerateQuiz />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/topics" 
                    element={
                      <ProtectedRoute>
                        <TopicsList />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/take-quiz/:id" 
                    element={
                      <ProtectedRoute>
                        <TakeQuiz />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
              <Toast />
            </div>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </DarkModeProvider>
  )
}

export default App
