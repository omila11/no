# NoteX - Personal Note Manager 📝

A full-stack note-taking application where users can securely sign up, log in, and manage their personal notes with complete CRUD functionality.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Private Notes**: Each user can only see and manage their own notes
- **Full CRUD Operations**: Create, Read, Update, and Delete notes
- **Responsive Design**: Beautiful UI built with React and Tailwind CSS
- **Real-time Feedback**: Toast notifications for user actions
- **Protected Routes**: Secure dashboard accessible only to authenticated users

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
MONGODB_URI=mongodb://localhost:27017/notex
JWT_SECRET=your-secret-key-change-this
PORT=5000
```

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎯 Usage

1. **Sign Up**: Create a new account with your name, email, and password
2. **Log In**: Access your account using your credentials
3. **Dashboard**: View all your notes in a beautiful card layout
4. **Create Note**: Click "New Note" to add a new note with title and content
5. **Edit Note**: Click "Edit" on any note to modify it
6. **Delete Note**: Click "Delete" to remove a note (with confirmation)
7. **Logout**: Safely log out of your account

## 📂 Project Structure

```
NoteX/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── server/
    ├── models/
    │   ├── User.js
    │   └── Note.js
    ├── routes/
    │   ├── auth.js
    │   └── notes.js
    ├── middleware/
    │   └── auth.js
    ├── index.js
    └── package.json
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Notes (Protected)
- `GET /api/notes` - Get all notes for logged-in user
- `GET /api/notes/:id` - Get a single note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## 🎨 Design Decisions

- **JWT Authentication**: Secure token-based authentication without sessions
- **Protected Routes**: Frontend route protection ensures only authenticated users access the dashboard
- **User Privacy**: Backend middleware validates user ownership of notes
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Toast Notifications**: Real-time feedback for better UX
- **Modal for Note Creation/Editing**: Clean UI without page navigation

## 🧪 Self-Evaluation

### Code Quality: 9/10
- Clean, organized, and well-structured code
- Proper separation of concerns (models, routes, middleware)
- Reusable components
- **Why not 10?**: Could add more comprehensive error handling and input validation

### Functionality: 10/10
- All required features implemented (Auth + CRUD)
- Smooth user experience
- Secure authentication with JWT
- Complete privacy - users only see their own notes

### UI/UX Design: 8/10
- Clean and modern interface
- Responsive design works on all devices
- Intuitive navigation
- **Why not 10?**: Could add more advanced features like search, categories, or dark mode

### Security: 8/10
- Passwords hashed with bcrypt
- JWT token authentication
- Protected routes on both frontend and backend
- **Why not 10?**: Could add rate limiting, input sanitization, and refresh tokens

### Code Documentation: 7/10
- Clear function and variable names
- Some inline comments
- **Why not 10?**: Could add more detailed JSDoc comments and API documentation

## 🚀 Future Enhancements

- Search and filter notes
- Note categories/tags
- Rich text editor
- Dark mode
- Note sharing
- Export notes (PDF, Markdown)
- Email verification
- Password reset functionality

## 👨‍💻 Developer Notes

### Time Spent: ~6-8 hours
- Backend setup & auth: 2 hours
- Note CRUD operations: 1.5 hours
- Frontend components: 2 hours
- Styling & UX: 1.5 hours
- Testing & debugging: 1 hour

### Trade-offs Made:
1. **Simple JWT vs Refresh Tokens**: Used simple JWT for quicker implementation. In production, would add refresh tokens.
2. **Client-side State**: Used local state instead of Context API or Redux for simplicity. Good enough for this scale.
3. **Basic Validation**: Implemented basic validation. Could add more robust validation with libraries like Joi or Yup.

### What I Learned:
- Better understanding of JWT authentication flow
- Improved React Router v6 usage with protected routes
- Tailwind CSS utility classes for rapid UI development
- MongoDB indexing for better query performance

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contact

Created for the Software Engineer Internship application - Feel free to reach out with questions!
