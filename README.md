# 🎯 SmartQuiz - AI-Powered Quiz Generator

A complete MERN stack application for creating and taking AI-generated quizzes. Built with React, Node.js, Express, MongoDB, and OpenAI API.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-ISC-blue)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Usage](#-usage)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure password hashing with bcrypt

### Quiz Generation
- AI-powered quiz generation using OpenAI
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
- **OpenAI API** - AI quiz generation
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
- OpenAI API key
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

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartquiz
JWT_SECRET=your_super_secret_jwt_key_here
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
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
| `OPENAI_API_KEY` | OpenAI API key | Yes |
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
      // Array of questions with options and correct answers
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

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

## 💻 Usage

### Creating a Quiz

1. Register or login to your account
2. Navigate to "Generate Quiz"
3. Enter a topic title and description
4. Click "Generate Questions"
5. Wait for AI to generate 10 MCQ questions
6. Review the generated questions

### Taking a Quiz

1. Go to "My Topics"
2. Click "Take Quiz" on any topic
3. Answer questions one by one
4. Navigate using Previous/Next buttons
5. Click "Finish Quiz" when done
6. View your score and review answers

### Dashboard

- View total topics created
- See recent quiz activity
- Quick access to generate new quizzes
- Navigate to all topics

## 🚢 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables in your hosting platform
2. Ensure MongoDB is accessible (use MongoDB Atlas for cloud)
3. Update CORS settings if needed
4. Deploy using platform-specific commands

**Example for Heroku:**
```bash
cd backend
heroku create smartquiz-api
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set OPENAI_API_KEY=your_openai_key
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Update API base URL in `frontend/src/utils/axios.js` to point to your deployed backend

3. Deploy the `dist` folder to your hosting platform

**Example for Vercel:**
```bash
cd frontend
vercel --prod
```

### Environment Variables for Production

Make sure to set:
- `NODE_ENV=production`
- Secure `JWT_SECRET` (use a strong random string)
- Valid MongoDB connection string
- Valid OpenAI API key

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

**OpenAI API Error**
- Verify `OPENAI_API_KEY` is correct
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

## 🙏 Acknowledgments

- OpenAI for the GPT API
- MongoDB for the database
- React and Express communities
- TailwindCSS for styling

---

**Note**: Make sure to keep your `.env` file secure and never commit it to version control. Use environment variables in production deployments.
