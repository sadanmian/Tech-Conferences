# 🧭 Tech Conference Dashboard

A **Personalized Dashboard for Tech Conferences** built with **Next.js**, **React**, and **Tailwind CSS**. This application allows users to explore tech conferences, personalize their schedule, and receive intelligent session recommendations based on their interests.

## 🚀 Features

### 📅 Conference Listing Page

- Fetch and display a list of tech conferences with filtering options (date, location, technology).
- Implemented **Server-Side Rendering (SSR)** for improved SEO and performance.
- Pagination support with 10 items per page.

### 🗂️ Conference Detail Page

- Show detailed information about a conference including schedule, speakers, and venue.
- Used **Incremental Static Regeneration (ISR)** with a revalidation period of 1 hour for up-to-date data.

### 🧩 Personal Schedule Builder

- Add or remove sessions to/from your personal schedule.
- Conflict detection prevents overlapping sessions.
- Used **React Context** for client-side state management.

### 🔍 Personalized Recommendations

- Recommend sessions based on user-selected sessions and interests.
- Custom algorithm to suggest relevant and non-conflicting sessions.

### 🎨 UI/UX Enhancements

- Responsive design using **Tailwind CSS**.
- Smooth animations and transitions for a polished user experience.

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### 📦 Installation

```bash
git clone https://github.com/your-username/tech-conference-dashboard.git
cd tech-conference-dashboard
npm install  # or yarn install
```

### 🧪 Run the Development Server

```bash
npm run dev  # or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧱 Architectural Decisions

### 1. Next.js App Router

- Used the **App Router** for routing and data fetching.
- Implemented SSR for listing pages and ISR for conference detail pages.

### 2. React Patterns

- Built reusable components with proper prop typing.
- Created a custom hook `useSchedule` for managing the user's personal schedule.
- Mixed server and client components appropriately.

### 3. State Management

- Used **React Context** to manage the user’s schedule globally.
- Maintained state consistency throughout the app.

### 4. Data Transformation

- Transformed data from **JSONPlaceholder API** to a conference-like schema:
  - Mapped users to conference organizers.
  - Grouped posts by `userId` to create conferences.
  - Used post titles and bodies for session details.
  - Added metadata like dates, times, and categories.

---

## 🌟 Notable Features & Optimizations

### ✅ Conflict Detection

- Prevents users from adding overlapping sessions.
- Handles edge cases with a custom logic.

### 🎯 Personalized Recommendations

- Suggests sessions based on selected topics and time availability.
- Filters out conflicting sessions automatically.

### 🚦 Performance Optimization

- Used `React.memo` and `useMemo` to reduce unnecessary re-renders.
- Added `loading.js` for a better user experience during data fetching.

### 📱 Responsive Design

- Fully responsive layout across mobile, tablet, and desktop screens using Tailwind CSS.

---

## 🧠 Challenges Faced & Solutions

### 1. Hydration Mismatch

- **Issue:** Mismatch between server and client rendering.
- **Solution:** Ensured consistent date formatting and deferred client-side rendering using `useEffect`.

### 2. Duplicate Keys in Lists

- **Issue:** React warning due to duplicate keys.
- **Solution:** Generated unique session IDs using a combination of user ID and index.

### 3. Conflict Detection Edge Cases

- **Issue:** Initial logic failed for adjacent sessions.
- **Solution:** Refined the conflict detection algorithm and displayed user-friendly error messages.

### 4. Reactive State in Recommendations

- **Issue:** Recommendation component didn't re-render on schedule updates.
- **Solution:** Connected directly to context state to trigger re-renders.

---

## 🔭 Future Improvements

- **🧠 Advanced Recommendations:** Include popularity, ratings, and trending topics.
- **📊 Unique Schedule Visualization:** Implement a calendar/timeline UI for the schedule.
- **⏳ Edge Case Handling:** Add “ghost sessions” and overload detection features.
- **🚀 Performance Boost:** Use **React Query** or **SWR** for better client-side fetching and caching.
- **📶 Network Indicator:** Display online/offline status to enhance user experience.

---

## 🚀 Deployment

The application is live on **Vercel**:

🔗 [https://tech-conferences-orpin.vercel.app/](https://tech-conferences-orpin.vercel.app/)

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements, suggestions, or bug fixes.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

### Built with ❤️ using Next.js, React, and Tailwind CSS
