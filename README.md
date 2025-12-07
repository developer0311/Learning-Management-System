# **Learning Management System (LMS) — React Project Overview**

## ⚙️ **Tech Stack**

- **React.js, HTML5, CSS3** — Frontend UI development
- **Bootstrap 5** — Responsive & modern styling
- **React Router DOM** — Page navigation and dynamic routing
- **Local JSON / JS Files** — Simulated backend data (Courses, Assignments, etc.)
- **React Google Charts** — Interactive data visualizations

---

## 🌐 **Routes (Pages)**

### 🏠 **Dashboard (`/`)**

- Displays a personalized user dashboard.
- Shows user greeting, course progress chart, and mentor info.
- “Continue Watching” section shows enrolled courses using reusable `Card` components.
- Integrated **bar chart** using `react-google-charts` to visualize weekly learning activity.

---

### 🎓 **All Courses (`/courses`)**

- Displays all available courses from `coursesData.js`.
- Divided into three sections — **Beginner**, **Intermediate**, and **Advanced**.
- Each section features:

  - Responsive horizontal carousel.
  - Left & right scroll buttons that disappear automatically when reaching the end.

- Each course card includes:

  - Title, image, author, rating, category tag, level, price, and discount.

---

### 📘 **Assignments (`/assignments`)**

- Displays a list of student assignments with `Title, description, course, due date, instructor, and marks`.

- Includes summary cards: **Total**, **Pending**, **Submitted**, **Graded**.
- Filter buttons for quick sorting by assignment status.
- Displays submission status badges and dynamic “days left” indicators.
- Responsive grid layout (mobile & desktop friendly).

---

### 👤 **Profile (`/profile`)**

- Displays mock user profile data (name, email, avatar).
- Shows user statistics like:

  - Total enrolled courses

- Optionally supports edit mode for updating user info.

---

## 🧱 **Common Components**

| Component         | Description                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| **Navbar**        | Top navigation with branding and links to pages                                  |
| **Sidebar**       | Fixed left navigation with menu items (Dashboard, Courses, Assignments, Profile) |
| **Card**          | Reusable course card component used in all views                                 |
| **LearningChart** | Displays weekly progress data using Google Charts                                |
| **PageLoader**    | Displays spinner animation during route changes                                  |
| **ScrollToTop**   | Automatically scrolls to top when navigating pages                               |
| **Footer**        | Footer with copyright and navigation                                             |

---

## 💡 **Features**

-  Clean & responsive UI (Bootstrap + custom CSS)
-  Visual analytics with Google Charts
-  Dynamic course carousels with smart scroll buttons
-  Assignments tracking with due dates & progress
-  Smooth animations & hover effects
-  Organized folder structure for scalability

---

## 🎁 **Optional Enhancements**

- 🌙 **Dark / Light mode toggle**
- 🧾 **Search & filter** by course name or category
- 💾 **Persistent data** using `localStorage`
- 🔔 **Notification / Reminder system** for upcoming deadlines

---

## 🚀 **Setup Instructions**

### 1️⃣ **Clone the repository**

```bash
git clone https://github.com/developer0311/learning-management-system
```

### 2️⃣ **Navigate to the project folder**

```bash
cd my-react-app
```

### 3️⃣ **Install dependencies**

```bash
npm install
```

### 4️⃣ **Run the development server**

```bash
npm run dev
```

### 5️⃣ **Open in your browser**

Visit [http://localhost:5173](http://localhost:5173)

---

## 🧾 **Deliverables**

-  Fully functional LMS frontend
-  Interactive dashboard with charts
-  Course carousels and assignment tracking
-  Clean, responsive design
-  Code hosted on GitHub

---

## 🔗 **Live Preview**

🚀 **Live Site:** [https://learning-management-system-mu-nine.vercel.app/](https://learning-management-system-mu-nine.vercel.app/)

---

Would you like me to make a **professional README.md layout (with badges, emojis & screenshots)** suitable for GitHub display next?
