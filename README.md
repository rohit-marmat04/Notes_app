# 📝 NoteShala

**NoteShala** is a web platform that provides institutional notes and free learning resources for college exam preparation.  
It also offers aptitude questions, quizzes for placement preparation, and real-time notifications for ongoing placement opportunities.  
The platform ensures secure access using **Google OAuth** authentication.

---

## 🚀 Features

1. 🔐 **Login/Register Page** – Secure Google OAuth authentication.  
2. 🔍 **Search Notes** – Find notes by course, college, semester, or subject name.  
3. 👤 **Profile Page** – Displays user details and personalized data.  
4. 📚 **Home Page Cards** – Displays available subjects and their related notes.  
5. 🏷️ **Template Page** – Shows tags like assessment, PYQs, and topic-specific resources.  
6. 📄 **Notes Page** – Displays detailed content of selected notes.  
7. 📝 **Handwritten Notes Page** – Browse through uploaded handwritten notes.  
8. 📰 **Notification Bar** – Stay updated on ongoing placement drives and opportunities.  
9. 🧠 **Assessment Tag** – Participate in quick quizzes to test your knowledge.  
10. 💬 **Support Section** – Get technical help or report issues.  
11. ❓ **FAQ Section** – Answers to common questions and platform guidance.

---

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** Google OAuth 2.0  
- **Additional Tools:** Mongoose, JWT, REST APIs

---

## ⚙️ Installation and Setup

Follow these steps to set up NoteShala locally:

```bash
# Clone the repository
git clone https://github.com/rohit-marmat04/noteshala.git

# Navigate into the project directory
cd noteshala

# Install dependencies for both client and server
cd client
npm install
cd ../server
npm install

# Create a .env file in the server folder and add required environment variables
# Example:
# MONGO_URI=your_mongodb_connection_string
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
# JWT_SECRET=your_jwt_secret

# Run the development servers
# In the client folder
npm start

# In the server folder
npm run dev

##📁 Folder Structure
NoteShala/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components (Home, Notes, Profile, etc.)
│   │   ├── context/      # Context API for global state
│   │   └── App.js
│   └── package.json
│
├── server/               # Node.js + Express backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth & error handling
│   └── server.js
│
└── README.md
---

# 📦 Usage

Once **NoteShala** is running locally or deployed:

1. **Sign in** using your Google account for secure access.  
2. **Explore Subjects** on the Home Page to view available notes for different courses and semesters.  
3. Use the **Search Form** to quickly find notes based on:
   - Course name  
   - College name  
   - Semester  
   - Subject name  
4. Click on any subject card to visit its **Template Page**, which includes:
   - Assessment quizzes 🧠  
   - Previous Year Questions (PYQs) 📄  
   - Specific topic notes 📘  
5. Visit the **Notes Page** to read or download study materials.  
6. Go to the **Handwritten Notes Section** for high-quality handwritten notes uploaded by contributors.  
7. Check the **Notification Bar** to stay updated about ongoing placement opportunities and internship openings.  
8. Use the **Support Section** for any technical queries.  
9. Refer to the **FAQ Section** for help with general questions.

---

## 📁 Folder Structure



