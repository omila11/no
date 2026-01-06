# Pre-Submission Testing Checklist ✅

Use this checklist to ensure everything works before submitting your project.

## Setup & Installation

- [ ] MongoDB is installed and running
- [ ] Backend dependencies installed (`cd server && npm install`)
- [ ] Frontend dependencies installed (`cd frontend && npm install`)
- [ ] `.env` file exists in server directory with correct values
- [ ] No errors in terminal after installation

## Backend Testing

### Server Startup
- [ ] Backend starts without errors (`cd server && npm start`)
- [ ] Console shows "Server is running on port 5000"
- [ ] Console shows "MongoDB connected successfully"
- [ ] No error messages in console

### API Endpoints (Optional - Use Postman or similar)
- [ ] POST `/api/auth/register` - Creates new user
- [ ] POST `/api/auth/login` - Returns token
- [ ] GET `/api/notes` - Returns empty array (with valid token)
- [ ] POST `/api/notes` - Creates note (with valid token)
- [ ] PUT `/api/notes/:id` - Updates note (with valid token)
- [ ] DELETE `/api/notes/:id` - Deletes note (with valid token)

## Frontend Testing

### Application Startup
- [ ] Frontend starts without errors (`cd frontend && npm run dev`)
- [ ] Opens at `http://localhost:5173`
- [ ] No console errors in browser
- [ ] No build warnings

### User Registration
- [ ] Can access signup page
- [ ] Form fields are visible and styled
- [ ] Validation works (empty fields show error)
- [ ] Can submit form with valid data
- [ ] Success message appears
- [ ] Redirects to login page
- [ ] Toast notification shows up

### User Login
- [ ] Can access login page
- [ ] Form fields are visible and styled
- [ ] Validation works
- [ ] Can login with registered credentials
- [ ] Token is stored in localStorage (check DevTools)
- [ ] User data is stored in localStorage
- [ ] Redirects to dashboard
- [ ] Toast notification shows success

### Dashboard
- [ ] Dashboard loads after login
- [ ] Header shows user's name
- [ ] "New Note" button is visible
- [ ] "Logout" button is visible
- [ ] Empty state shows when no notes

### Note Creation
- [ ] Click "New Note" opens modal
- [ ] Modal is styled properly
- [ ] Can enter title and content
- [ ] "Create Note" button works
- [ ] Note appears in dashboard immediately
- [ ] Modal closes after creation
- [ ] Toast notification shows success

### Note Display
- [ ] Notes are displayed in cards
- [ ] Title and content are visible
- [ ] Date/time is shown
- [ ] Edit and Delete buttons are visible
- [ ] Notes are sorted by most recent

### Note Editing
- [ ] Click "Edit" opens modal
- [ ] Modal shows existing note data
- [ ] Can modify title and content
- [ ] "Update Note" button works
- [ ] Changes are reflected immediately
- [ ] Modal closes after update
- [ ] Toast notification shows success

### Note Deletion
- [ ] Click "Delete" shows confirmation dialog
- [ ] "Cancel" in confirmation works
- [ ] "OK" in confirmation deletes note
- [ ] Note disappears from dashboard
- [ ] Toast notification shows success

### User Privacy
- [ ] Logout clears localStorage
- [ ] After logout, redirects to login
- [ ] Cannot access dashboard without login
- [ ] Attempting to access `/dashboard` without token redirects to login

## UI/UX Testing

### Responsive Design
- [ ] Works on desktop (1920px)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px)
- [ ] No horizontal scrolling
- [ ] All buttons are clickable

### Visual Design
- [ ] Consistent color scheme
- [ ] Proper spacing and padding
- [ ] Readable fonts
- [ ] Buttons have hover effects
- [ ] Forms are well-aligned
- [ ] No overlapping elements

### User Experience
- [ ] Navigation is intuitive
- [ ] Loading states are clear
- [ ] Error messages are helpful
- [ ] Success feedback is immediate
- [ ] No broken links
- [ ] Smooth transitions

## Security Testing

- [ ] Passwords are not visible when typing
- [ ] Cannot access API without token
- [ ] Cannot access other users' notes
- [ ] Token expires properly
- [ ] Logout clears all user data

## Error Handling

- [ ] Invalid login shows error message
- [ ] Duplicate email on signup shows error
- [ ] Network errors are handled gracefully
- [ ] Missing fields show validation errors
- [ ] Server errors show user-friendly messages

## Code Quality

- [ ] No console.error messages in browser
- [ ] No ESLint errors
- [ ] Code is properly formatted
- [ ] No unused imports
- [ ] No commented-out code blocks

## Documentation

- [ ] README.md is complete and accurate
- [ ] QUICKSTART.md has correct instructions
- [ ] ARCHITECTURE.md explains the project
- [ ] All setup steps are documented
- [ ] Self-evaluation section is filled

## Final Checks

- [ ] All dependencies are in package.json
- [ ] `.env.example` file exists
- [ ] `.gitignore` files are correct
- [ ] No sensitive data committed to repo
- [ ] Project structure is clean
- [ ] All files are saved

## Performance

- [ ] App loads quickly
- [ ] No lag when creating/editing notes
- [ ] Smooth scrolling
- [ ] Fast API responses

## Browser Testing

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Edge
- [ ] Works in Safari (if available)

## Submission Checklist

- [ ] All features are working
- [ ] No critical bugs
- [ ] README is complete with self-evaluation
- [ ] Code is clean and well-organized
- [ ] Project can be run following the instructions
- [ ] Screenshots/video demo prepared (optional)

---

## Known Issues (Document any issues here)

```
Example:
- Minor: Toast notifications might overlap if too many actions performed quickly
- Workaround: Wait for previous toast to disappear
```

---

## Test Results Summary

**Date Tested:** _______________

**Tested By:** _______________

**Overall Status:** [ ] Pass [ ] Needs Fixing

**Notes:**
```
Write any additional observations or comments here
```

---

**Ready for Submission:** [ ] YES [ ] NO

If NO, what needs to be fixed:
1. 
2. 
3.
