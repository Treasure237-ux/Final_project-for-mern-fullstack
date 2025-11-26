# 🎯 SmartQuiz - AI-Powered Quiz Generator

An intelligent MERN stack application that generates custom AI-powered quizzes on any topic. Built with React, Node.js, Express, MongoDB, and Groq AI API.

Create quizzes in seconds using AI, take them interactively, and get instant feedback on your answers.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-ISC-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

## 🚀 Try It Now

**Live Demo:** [https://final-project-seven-ecru.vercel.app](https://final-project-seven-ecru.vercel.app)

Sign up, generate a quiz on any topic, and start testing your knowledge instantly!

## 📋 Table of Contents

- [About](#about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contact](#-contact)

## About

SmartQuiz is a web application that leverages AI to generate high-quality multiple-choice quizzes on any topic. No more manually creating questions — just provide a topic and description, and our AI generates 10 well-crafted MCQ questions instantly.

**Key Features:**
- 🤖 AI-generated quizzes in seconds
- 📊 Instant scoring and detailed feedback
- 🔒 Secure authentication with JWT
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🚀 Production-ready deployment

## ✨ Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure password hashing with bcrypt

### Quiz Generation
- AI-powered quiz generation using Groq
- Generate 10 MCQ questions per topic
- Custom topic title and description
- Automatic question formatting

### Quiz Management
- View all created topics
- Take quizzes question-by-question
- Real-time score calculation
- Detailed results with answer review

### User Interface
- Modern, responsive design with TailwindCSS
- Dark mode support
- Toast notifications
- Loading states
- Mobile-friendly

### Dashboard
- Quiz statistics
- Recent activity
- Quick actions
- Summary cards

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Groq AI API** - AI quiz generation
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **Context API** - State management

## 📁 Project Structure

```
SmartQuiz/
├── backend/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   │   ├── authController.js
│   │   └── topicController.js
│   ├── middleware/       # Custom middleware
│   │   ├── authenticateUser.js
│   │   └── errorHandler.js
│   ├── models/          # Database models
│   │   ├── User.js
│   │   └── Topic.js
│   ├── routes/          # API routes
│   │   ├── authRoutes.js
│   │   └── topicRoutes.js
│   ├── utils/           # Utility functions
│   │   └── asyncHandler.js
│   ├── index.js         # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Toast.jsx
    │   │   ├── Loader.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── QuizCard.jsx
    │   ├── context/     # Context providers
    │   │   ├── AuthContext.jsx
    │   │   ├── DarkModeContext.jsx
    │   │   └── ToastContext.jsx
    │   ├── pages/       # Page components
    │   │   ├── LandingPage.jsx
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── GenerateQuiz.jsx
    │   │   ├── TopicsList.jsx
    │   │   └── TakeQuiz.jsx
    │   ├── utils/       # Utility functions
    │   │   └── axios.js
    │   ├── App.jsx      # Main app component
    │   ├── main.jsx     # Entry point
    │   └── index.css    # Global styles
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Groq API key
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd SmartQuiz
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `GROQ_API_KEY` | Groq API key | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Example MongoDB URI Formats

- Local: `mongodb://localhost:27017/smartquiz`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/smartquiz`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Topic Endpoints

All topic endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### Generate Quiz Questions
```http
POST /api/topic/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "JavaScript Fundamentals",
  "description": "Basic concepts of JavaScript programming"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Questions generated successfully",
  "topic": {
    "id": "topic_id",
    "title": "JavaScript Fundamentals",
    "description": "Basic concepts of JavaScript programming",
    "questions": [
      {
        "question": "What is JavaScript?",
        "options": {
          "A": "A programming language",
          "B": "A coffee brand",
          "C": "A database",
          "D": "A framework"
        },
        "correctAnswer": "A"
      }
      // ... 9 more questions
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get All Topics
```http
GET /api/topic/all
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "topics": [
    {
      "_id": "topic_id",
      "title": "JavaScript Fundamentals",
      "description": "Basic concepts of JavaScript programming",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Topic by ID
```http
GET /api/topic/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "topic": {
    "id": "topic_id",
    "title": "JavaScript Fundamentals",
    "description": "Basic concepts of JavaScript programming",
    "questions": [
      // Array of questions with options only (correct answers are NOT included when fetching the quiz)
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

> Note: The GET /api/topic/:id endpoint intentionally omits the `correctAnswer` field so that users taking the quiz cannot see the answers. To submit answers for grading, use the Submit Quiz endpoint described below.

#### Get Statistics
```http
GET /api/topic/statistics
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "statistics": {
    "totalTopics": 5,
    "recentTopics": [
      {
        "id": "topic_id",
        "title": "Recent Topic",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Submit Quiz (grade answers)

```http
POST /api/topic/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": {
    "0": "A",
    "1": "C",
    // ...
  }
}
```

**Response:**

```json
{
  "success": true,
  "score": 8,
  "total": 10,
  "results": [
    {
      "question": "...",
      "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
      "correctAnswer": "B",
      "userAnswer": "A",
      "isCorrect": false
    }
    // ...
  ]
}
```

This endpoint grades the submitted answers server-side and returns the per-question results along with the correct answers (safe to include after grading).

## 💻 Usage

### Step 1: Create Your Account
1. Visit the live demo: [https://final-project-seven-ecru.vercel.app](https://final-project-seven-ecru.vercel.app)
2. Click "Sign Up" and create a new account
3. You're ready to generate quizzes!

### Step 2: Generate a Quiz
1. Navigate to **"Generate Quiz"** from the dashboard
2. Enter a **topic title** (e.g., "Python Basics")
3. Provide a **description** (e.g., "Fundamental concepts of Python programming")
4. Click **"Generate Questions"**
5. Wait a few seconds while our AI generates 10 MCQ questions
6. Review the questions before taking the quiz

### Step 3: Take a Quiz
1. Go to **"My Topics"** to see all your generated quizzes
2. Click **"Take Quiz"** on any topic
3. Answer each question by selecting an option (A, B, C, or D)
4. Use **Previous/Next** to navigate between questions
5. Click **"Finish Quiz"** when done
6. View your **score** and detailed **answer review**
   - Green: Correct answers
   - Red: Incorrect answers
   - See which ones you got wrong and the correct answer

### Step 4: Dashboard
- **View Statistics:** See total quizzes created and recent activity
- **Quick Actions:** Generate new quizzes or retake existing ones
- **Dark Mode:** Toggle dark mode for comfortable viewing anytime

## 🚢 Deployment

This project is deployed on **Render** (backend) and **Vercel** (frontend). You can deploy your own instance following these steps:

### Deploy Backend (Render)

1. Create a Render account at [render.com](https://render.com)
2. Create a new **Web Service** and connect your GitHub repository
3. Set the root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Set environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - A long secure random string (min 32 characters)
   - `GROQ_API_KEY` - Your Groq API key from [console.groq.com](https://console.groq.com)
   - `NODE_ENV=production`
7. Click Deploy

### Deploy Frontend (Vercel)

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Set environment variable:
   - `VITE_API_BASE_URL=https://your-render-backend.onrender.com/api`
7. Click Deploy

### Get Required Keys

- **MongoDB Atlas:** [mongodb.com/cloud](https://mongodb.com/cloud) - Create a free cluster and get connection string
- **Groq API:** [console.groq.com](https://console.groq.com) - Sign up and generate API key
- **JWT Secret:** Generate using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Environment Variables Summary

**Backend (.env):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_generated_secret_key_here
GROQ_API_KEY=gsk_your_groq_key_here
NODE_ENV=production
PORT=5000
```

**Frontend (Vercel):**
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration
- [ ] User login
- [ ] JWT token validation
- [ ] Quiz generation
- [ ] Topic listing
- [ ] Quiz taking
- [ ] Score calculation
- [ ] Dark mode toggle
- [ ] Toast notifications
- [ ] Protected routes
- [ ] Error handling

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network connectivity

**Groq API Error**
- Verify `GROQ_API_KEY` is correct
- Check API key has sufficient credits
- Ensure internet connection

**CORS Errors**
- Verify backend CORS settings
- Check frontend API base URL
- Ensure both servers are running

**JWT Token Errors**
- Clear localStorage and login again
- Verify `JWT_SECRET` is set
- Check token expiration

## 📝 Code Structure

### Backend Architecture

- **Controllers**: Handle business logic and API responses
- **Models**: Define database schemas
- **Routes**: Define API endpoints
- **Middleware**: Handle authentication and errors
- **Utils**: Reusable utility functions

### Frontend Architecture

- **Components**: Reusable UI components
- **Pages**: Full page components
- **Context**: Global state management
- **Utils**: Helper functions and API client

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ using the MERN stack

**Contact & Connect:**
- 📧 **Email:** [tboyokirhie@gmail.com](mailto:tboyokirhie@gmail.com)
- 🐙 **GitHub:** [github.com/Treasure237-ux](https://github.com/Treasure237-ux)
- 💬 **Discord:** @okirhie_treasure

## 🙏 Acknowledgments

- Groq for the powerful GPT API
- MongoDB for reliable cloud database
- React and Express communities
- TailwindCSS for beautiful styling
- Vercel and Render for seamless deployment

---

**Note**: Make sure to keep your `.env` file secure and never commit it to version control. Use environment variables in production deployments.

**Ready to use?** Visit the live demo: [https://final-project-seven-ecru.vercel.app](https://final-project-seven-ecru.vercel.app)
