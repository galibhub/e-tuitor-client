# 🎓 eTuitionBd - Online Tuition Management Platform

**eTuitionBd** is a modern web application that connects students with qualified tutors in Bangladesh. Students can post tuition requirements, tutors can apply for jobs, and the entire hiring process happens smoothly through our platform.

🌐 **Live Website:** [https://etutionbd.netlify.app](https://etutionbd.netlify.app)  
💻 **GitHub Repository:** [https://github.com/galibhub/e-tuitor-client](https://github.com/galibhub/e-tuitor-client)

---

## 🌟 Project Overview

Finding a reliable tutor in Bangladesh can be difficult. Students often search through Facebook groups, WhatsApp, or random websites without knowing if the tutor is qualified. eTuitionBd solves this problem by creating a trusted platform where:

- **Students** can post tuition requirements with all details
- **Tutors** can browse jobs and apply with their qualifications
- **Admins** verify and approve all posts to ensure quality
- **Payments** are handled securely through Stripe

Think of it as a "job portal" but specifically for tuition!

---

## ✨ Key Features

### 👨‍🎓 For Students:

- ✍️ **Post Tuition Jobs** - Create detailed tuition posts with subject, class, salary, location, and more
- 📝 **Manage Posts** - Edit or delete your posted tuitions anytime
- 👀 **View Applications** - See all tutors who applied for your tuitions
- 💰 **Hire Tutors** - Review applications and select the best tutor
- 💳 **Secure Payments** - Pay tutors safely using Stripe payment gateway
- 📊 **Dashboard** - Track all your tuitions, applications, and payments in one place

### 👨‍🏫 For Tutors:

- 🔍 **Browse Jobs** - View all approved tuition opportunities
- ✍️ **Apply for Tuitions** - Submit applications with qualifications and expected salary
- 📈 **Track Applications** - Monitor application status (Pending/Approved/Rejected)
- 💼 **Ongoing Tuitions** - Manage your active teaching assignments
- 💰 **Revenue History** - Track all your earnings and payment transactions
- 📚 **Profile Management** - Update your information and photo

### 👨‍💼 For Admin:

- ✅ **Approve/Reject Posts** - Review tuition posts before they go live
- 👥 **User Management** - View and manage all registered users
- 📊 **Reports & Analytics** - View platform statistics and insights
- 🛡️ **Content Moderation** - Ensure quality and safety of all content

### 🌟 General Features:

- 🔐 **Secure Authentication** - Login with Email/Password or Google Sign-In
- 🎨 **Beautiful UI** - Modern, clean design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🌓 **Theme Support** - Dark/Light mode with DaisyUI themes
- 🔒 **Protected Routes** - Role-based access control (Student/Tutor/Admin)
- 🚀 **Fast Performance** - Built with Vite for lightning-fast load times

---

## 🛠️ Technologies Used

### Frontend Framework & Tools:

| Technology          | Purpose                                                   |
| ------------------- | --------------------------------------------------------- |
| **React 18**        | JavaScript library for building user interfaces           |
| **Vite**            | Next-generation build tool (faster than Create React App) |
| **React Router v6** | Client-side routing and navigation                        |
| **Tailwind CSS**    | Utility-first CSS framework for styling                   |
| **DaisyUI**         | Component library built on Tailwind CSS                   |

### Backend & Database:

| Technology        | Purpose                                       |
| ----------------- | --------------------------------------------- |
| **MongoDB**       | NoSQL database for storing all data           |
| **Express.js**    | Node.js framework for building REST API       |
| **Firebase Auth** | User authentication (Email/Password + Google) |
| **Stripe**        | Secure payment processing                     |

### State Management & Data Fetching:

| Technology         | Purpose                                  |
| ------------------ | ---------------------------------------- |
| **TanStack Query** | Server state management and data caching |
| **Axios**          | HTTP client for making API requests      |
| **React Context**  | Global state management for auth         |

### Form Handling & UI:

| Technology          | Purpose                                  |
| ------------------- | ---------------------------------------- |
| **React Hook Form** | Form validation and management           |
| **SweetAlert2**     | Beautiful alert and confirmation dialogs |
| **React Icons**     | Icon library with 1000+ icons            |
| **Framer Motion**   | Animation library for smooth transitions |

### Image & File Handling:

| Technology    | Purpose                       |
| ------------- | ----------------------------- |
| **ImgBB API** | Image hosting and CDN service |

---

## 📁 Project Structure

```
etution-client/
│
├── public/
│   ├── _redirects              # Netlify redirect rules for SPA routing
│   └── vite.svg                # Favicon
│
├── src/
│   │
│   ├── assets/                 # Images and static files
│   │   ├── authImage.png       # Login/Register page illustration
│   │   └── illustration.jpg    # About page image
│   │
│   ├── contexts/               # React Context API providers
│   │   └── AuthContext/
│   │       └── AuthContext.jsx # Authentication context
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.jsx         # Hook for accessing auth state
│   │   ├── useAxiosSecure.jsx  # Axios instance with interceptors
│   │   └── useUserRole.jsx     # Hook to get current user's role
│   │
│   ├── layouts/                # Page layout components
│   │   ├── AuthLayout.jsx      # Layout for Login/Register pages
│   │   ├── DashboardLayout.jsx # Layout for Dashboard pages
│   │   ├── ProfileSetting.jsx  # User profile settings page
│   │   └── RootLayouts.jsx     # Main layout with Navbar/Footer
│   │
│   ├── pages/                  # All page components
│   │   │
│   │   ├── Admin/              # Admin-only pages
│   │   │   ├── ReportAnalysis.jsx
│   │   │   ├── TuitionManagement.jsx
│   │   │   └── UserManagement.jsx
│   │   │
│   │   ├── AuthLayout/         # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── SocialLogin.jsx # Google Sign-In component
│   │   │
│   │   ├── Home/               # Public pages
│   │   │   ├── AllTutions.jsx
│   │   │   ├── Home.jsx
│   │   │   └── TuitionDetails.jsx
│   │   │
│   │   ├── NavbarPages/        # Pages linked in Navbar
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Tutions.jsx
│   │   │   └── Tutors.jsx
│   │   │
│   │   ├── Shared/             # Shared components
│   │   │   ├── Footer/
│   │   │   │   └── Footer.jsx
│   │   │   └── Navbar/
│   │   │       └── Navbar.jsx
│   │   │
│   │   ├── Student/            # Student dashboard pages
│   │   │   ├── AppliedTuitor.jsx    # View tutors who applied
│   │   │   ├── ManagePost.jsx       # Edit/Delete tuition posts
│   │   │   ├── MyPayments.jsx       # Payment history
│   │   │   ├── MyTution.jsx         # View my tuitions
│   │   │   ├── Payment.jsx          # Make payment
│   │   │   ├── PaymentCancel.jsx    # Payment cancelled
│   │   │   ├── PaymentSuccess.jsx   # Payment successful
│   │   │   └── PostTution.jsx       # Create new tuition
│   │   │
│   │   └── Tuitor/             # Tutor dashboard pages
│   │       ├── MyApplication.jsx    # View/Edit applications
│   │       ├── OnGoingTution.jsx    # Active tuitions
│   │       └── RevenueHistory.jsx   # Earnings history
│   │
│   ├── routes/                 # Routing configuration
│   │   ├── AdminRoute.jsx      # Protected route for admins
│   │   ├── PrivateRoute.jsx    # Protected route (requires login)
│   │   ├── Router.jsx          # Main router configuration
│   │   ├── StudentRoute.jsx    # Protected route for students
│   │   └── TutorRoute.jsx      # Protected route for tutors
│   │
│   ├── App.css                 # Global CSS styles
│   ├── App.jsx                 # Main App component
│   ├── index.css               # Tailwind imports
│   └── main.jsx                # React entry point
│
├── .env                        # Environment variables (NOT in GitHub)
├── .gitignore                  # Files to ignore in Git
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
├── package.json                # Project dependencies
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

---

## 🚀 Installation & Setup Guide

### Prerequisites

Before starting, make sure you have these installed on your computer:

1. **Node.js** (version 16 or higher)

   - Download from: https://nodejs.org/
   - Check installation: `node --version`

2. **npm** (comes with Node.js)

   - Check installation: `npm --version`

3. **Git** (for cloning the repository)

   - Download from: https://git-scm.com/
   - Check installation: `git --version`

4. **Code Editor** (recommended: VS Code)
   - Download from: https://code.visualstudio.com/

---

### Step-by-Step Installation

#### 1️⃣ Clone the Repository

Open your terminal/command prompt and run:

```bash
git clone https://github.com/galibhub/e-tuitor-client.git
cd e-tuitor-client
```

Or download the ZIP file from GitHub and extract it.

---

#### 2️⃣ Install Dependencies

Run this command in the project folder:

```bash
npm install
```

This will install all required packages (React, Tailwind, etc.). It may take 2-3 minutes.

---

#### 3️⃣ Set Up Environment Variables

Create a file named `.env` in the root folder (same level as `package.json`):

```env
# Firebase Configuration
VITE_apiKey=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_authDomain=your-project.firebaseapp.com
VITE_projectId=your-project-id
VITE_storageBucket=your-project.appspot.com
VITE_messagingSenderId=123456789012
VITE_appId=1:123456789012:web:abcdef123456

# ImgBB API Key (for image uploads)
VITE_imgage_host_key=your_imgbb_api_key_here

# Stripe Public Key (for payments)
VITE_STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX

# Backend API URL
VITE_API_URL=https://etution-server.vercel.app
```

**⚠️ Important:** All variable names MUST start with `VITE_` to work with Vite!

---

#### 4️⃣ Get API Keys

You need to create accounts and get API keys:

**Firebase Setup:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication → Email/Password and Google
4. Go to Project Settings → Your Apps → Config
5. Copy the config values to your `.env` file

**ImgBB Setup:**

1. Go to [ImgBB API](https://api.imgbb.com/)
2. Create account and get API key
3. Add to `.env` as `VITE_imgage_host_key`

**Stripe Setup:**

1. Go to [Stripe](https://stripe.com/)
2. Create account
3. Get **Publishable Key** from Developers → API Keys
4. Add to `.env` as `VITE_STRIPE_PUBLIC_KEY`

---

#### 5️⃣ Run the Development Server

```bash
npm run dev
```

The app will open at: **http://localhost:5173**

You should see the homepage! 🎉

---

## 🏗️ Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

To test the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment Guide

### Deploy to Netlify (Recommended)

#### Method 1: Drag & Drop

1. Run `npm run build`
2. Go to [Netlify](https://www.netlify.com/)
3. Drag the `dist` folder to Netlify

#### Method 2: GitHub Integration (Automatic Deploys)

1. Push your code to GitHub
2. Go to Netlify → New Site from Git
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18
5. Add environment variables in Netlify:
   - Site Settings → Environment Variables
   - Add all variables from your `.env` file
6. Deploy!

**✅ The `public/_redirects` file is already configured for React Router**

---

## 🎮 How to Use the Application

### As a Student:

1. **Register/Login**

   - Click "Register" → Fill form → Select "Student" role
   - Or login with Google

2. **Post a Tuition**

   - Go to Dashboard → Post New Tuition
   - Fill in: Subject, Class, Salary, Location, etc.
   - Submit and wait for admin approval

3. **View Applications**

   - After admin approves, tutors can apply
   - Go to Dashboard → Applied Tutors
   - Review tutor applications

4. **Hire a Tutor**
   - Select the tutor you want
   - Make payment through Stripe
   - Tuition starts!

---

### As a Tutor:

1. **Register/Login**

   - Click "Register" → Fill form → Select "Tutor" role
   - Or login with Google

2. **Browse Tuitions**

   - Click "Tuitions" in navbar
   - View all available tuition jobs

3. **Apply for Jobs**

   - Click "View Details" on a tuition
   - Click "Apply Now"
   - Fill application form with:
     - Your qualifications
     - Teaching experience
     - Expected salary

4. **Track Applications**

   - Go to Dashboard → My Applications
   - See status: Pending/Approved/Rejected
   - Edit applications before approval

5. **Manage Tuitions**
   - Dashboard → Ongoing Tuitions (approved jobs)
   - Dashboard → Revenue History (earnings)

---

### As an Admin:

1. **Login** with admin credentials

2. **Approve Tuitions**

   - Dashboard → Tuition Management
   - Review posts → Approve or Reject

3. **Manage Users**

   - Dashboard → User Management
   - View all registered users

4. **View Reports**
   - Dashboard → Reports & Analytics
   - See platform statistics

---

## 🔑 Test Accounts

You can create these accounts for testing:

| Role    | Email             | Password    |
| ------- | ----------------- | ----------- |
| Admin   | admin@etution.com | Admin@123   |
| Student | student@test.com  | Student@123 |
| Tutor   | tutor@test.com    | Tutor@123   |

_Note: Create these through registration with respective roles_

---

## 🔒 Security Features

✅ **Protected Routes** - Unauthenticated users can't access dashboard  
✅ **Role-Based Access** - Students can't access tutor pages and vice versa  
✅ **Secure Passwords** - Firebase handles password encryption  
✅ **Environment Variables** - Sensitive data never exposed in code  
✅ **HTTPS** - Production site uses secure connections  
✅ **Payment Security** - Stripe handles all payment processing

---

## 🐛 Common Issues & Solutions

### Issue 1: "npm install" fails

**Solution:**

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

---

### Issue 2: Environment variables not working

**Possible causes:**

- Variable names don't start with `VITE_`
- `.env` file is in wrong location (must be in root)
- Server not restarted after adding variables

**Solution:**

1. Check variable names: `VITE_apiKey` ✅ not `apiKey` ❌
2. Restart dev server: `Ctrl+C` then `npm run dev`

---

### Issue 3: Firebase authentication error

**Solution:**

- Check Firebase Console → Authentication is enabled
- Verify all Firebase config values in `.env`
- Enable Email/Password and Google providers

---

### Issue 4: "Page not found" on refresh (Production)

**Solution:**  
Make sure `public/_redirects` file exists with:

```
/* /index.html 200
```

---

### Issue 5: Images not uploading

**Solution:**

- Verify ImgBB API key is correct
- Check internet connection
- Make sure image is under 32MB

---

### Issue 6: Payment not working

**Solution:**

- Use Stripe test card: `4242 4242 4242 4242`
- Any future date for expiry
- Any 3 digits for CVC
- Check Stripe public key in `.env`

---

## 📝 Available NPM Scripts

```bash
npm run dev       # Start development server (localhost:5173)
npm run build     # Create production build
npm run preview   # Preview production build locally
npm run lint      # Check code for errors
```

---

## 🤝 Contributing

Want to contribute? Great! Here's how:

1. **Fork** the repository
2. **Create a branch:** `git checkout -b feature/amazing-feature`
3. **Make changes** and commit: `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Galib**

- GitHub: [@galibhub](https://github.com/galibhub)
- Project: [e-tuitor-client](https://github.com/galibhub/e-tuitor-client)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Firebase](https://firebase.google.com/)
- [Stripe](https://stripe.com/)
- [TanStack Query](https://tanstack.com/query)
- [React Icons](https://react-icons.github.io/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📞 Support & Help

If you're stuck or have questions:

1. **Check the Issues tab** on [GitHub](https://github.com/galibhub/e-tuitor-client/issues)
2. **Create a new issue** with details about your problem
3. **Contact:** via GitHub profile

---

## 🎯 Roadmap & Future Features

- [ ] Real-time chat between students and tutors
- [ ] Video call integration for online classes
- [ ] Mobile app (React Native)
- [ ] SMS/Email notifications
- [ ] Advanced search and filters
- [ ] Rating and review system
- [ ] Attendance tracking
- [ ] Progress reports and analytics
- [ ] Multiple language support (Bangla/English)
- [ ] Bulk tuition posting for coaching centers

---

## 📊 Project Statistics

- **Total Components:** 50+
- **Total Pages:** 25+
- **Code Lines:** 10,000+
- **Development Time:** 3 weeks
- **Contributors:** 1

---

## 🔗 Important Links

- 🌐 **Live Website:** [https://etutionbd.netlify.app](https://etutionbd.netlify.app)
- 💻 **GitHub Repository:** [https://github.com/galibhub/e-tuitor-client](https://github.com/galibhub/e-tuitor-client)
- 👨‍💻 **Developer:** [@galibhub](https://github.com/galibhub)

---

## 💡 Tips for New Developers

1. **Start with the routes** - Look at `src/routes/Router.jsx` to understand the app structure
2. **Understand auth flow** - Check `src/contexts/AuthContext` to see how login works
3. **Follow the data** - Use React DevTools to see how data flows
4. **Read component comments** - Many files have helpful comments
5. **Ask questions** - Don't hesitate to create issues on GitHub

---

**Made with ❤️ for the education community of Bangladesh**

---

_Last Updated: December 10, 2025_

_If you found this project helpful, please give it a ⭐ on [GitHub](https://github.com/galibhub/e-tuitor-client)!_
