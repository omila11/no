# Quick Start Guide 🚀

Follow these steps to get NoteX up and running on your machine.

## Prerequisites Checklist
- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running (or MongoDB Atlas account)
- [ ] Git installed (optional)

## Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

## Step 2: Configure Environment Variables

The `.env` file is already created. If you're using MongoDB Atlas or want to change settings:

```bash
# Edit server/.env with your preferred editor
# Update MONGODB_URI if needed
# Update JWT_SECRET to a secure random string
```

## Step 3: Start MongoDB (if using local MongoDB)

**Windows:**
```bash
# MongoDB usually runs as a service on Windows
# Check if it's running:
net start MongoDB

# If not running, start it:
net start MongoDB
```

**Mac/Linux:**
```bash
# Using Homebrew (Mac):
brew services start mongodb-community

# Or manually:
mongod --dbpath /path/to/data/directory
```

## Step 4: Start the Backend Server

```bash
# Make sure you're in the server directory
cd server
npm start
```

You should see:
```
Server is running on port 5000
MongoDB connected successfully
```

## Step 5: Install Frontend Dependencies

Open a new terminal window:

```bash
cd frontend
npm install
```

## Step 6: Start the Frontend Development Server

```bash
# Make sure you're in the frontend directory
cd frontend
npm run dev
```

You should see:
```
VITE ready in Xms

➜  Local:   http://localhost:5173/
```

## Step 7: Open Your Browser

Navigate to: `http://localhost:5173`

## 🎉 You're All Set!

1. **Create an Account**: Click on the signup page and create your account
2. **Login**: Use your credentials to log in
3. **Start Creating Notes**: Click "New Note" to create your first note!

## Troubleshooting

### Backend won't start?
- Check if MongoDB is running
- Check if port 5000 is available
- Run `npm install` again in the server directory

### Frontend won't start?
- Check if port 5173 is available
- Run `npm install` again in the frontend directory
- Clear browser cache

### Can't connect to MongoDB?
- Make sure MongoDB is running
- Check MONGODB_URI in `.env` file
- For MongoDB Atlas, check your connection string and IP whitelist

### CORS errors?
- Make sure backend is running on port 5000
- Check if CORS is properly configured in server/index.js

## Testing the Application

### Test User Registration:
1. Go to signup page
2. Enter: Name, Email, Password
3. Click "Sign Up"
4. Should redirect to login page

### Test Login:
1. Enter your email and password
2. Click "Login"
3. Should redirect to dashboard

### Test Note Creation:
1. Click "New Note"
2. Enter title and content
3. Click "Create Note"
4. Note should appear in your dashboard

### Test Note Operations:
- **Edit**: Click "Edit" button on any note
- **Delete**: Click "Delete" button (will ask for confirmation)
- **View**: All your notes are displayed in the dashboard

## Need Help?

If you encounter any issues:
1. Check the console for error messages
2. Make sure all dependencies are installed
3. Verify MongoDB is running
4. Check that both servers (frontend & backend) are running

Happy note-taking! 📝
