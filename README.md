# StudyEase - Academic Resource Platform

A clean, organized platform for students to access study materials, previous year questions, and collaborate through subject-specific discussions.

## Features

- **Authentication**: Email/password login and signup
- **Department Selection**: Choose from various engineering departments
- **Subject Organization**: Access subjects organized by department and semester
- **Resource Management**: Upload and download Notes, PYQs, PDFs, and PPTs
- **Subject Discussions**: Dedicated chat spaces for each subject
- **Clean UI**: Solid colors, no gradients - simple and professional design

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **Styling**: Custom CSS with CSS variables

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update MONGODB_URI in .env.local

3. **Environment Variables**
   - Copy .env.local and update values:
   ```
   MONGODB_URI=mongodb://localhost:27017/studyease
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Open http://localhost:3000
   - Create an account or login
   - Select department and explore subjects

## Project Structure

```
studyease/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/page.tsx
│   ├── subject/[id]/page.tsx
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts
│   │       └── signup/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── models/User.ts
│   └── mongodb.ts
├── styles/globals.css
└── package.json
```

## Available Departments

- Computer Science Engineering (CSE)
- Electronics & Communication Engineering (ECE)
- Electrical & Electronics Engineering (EEE)
- Mechanical Engineering (ME)
- Civil Engineering (CE)
- Information Technology (IT)
- Aerospace Engineering (AE)
- Chemical Engineering (CHE)

## User Flow

1. **Authentication** - Login/Signup with email and password
2. **Department Selection** - Choose your engineering department
3. **Subject Selection** - Browse subjects by semester
4. **Resource Access** - View/upload Notes, PYQs, PDFs, PPTs
5. **Discussion** - Participate in subject-specific chats

## Design Principles

- **Clean & Simple**: Solid colors only, no gradients
- **Intuitive Navigation**: Mirrors college structure
- **Organized Content**: Clear categorization of resources
- **Focused Discussions**: Subject-specific chat to avoid chaos
- **Mobile Responsive**: Works on all devices

## Future Enhancements

- College email integration
- Quick revision section
- Advanced search functionality
- File preview capabilities
- Real-time notifications
- Mobile app