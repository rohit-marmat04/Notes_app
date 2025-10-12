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

---

NoteShala/
├── client/               # React frontend (Vite)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/               # Node.js + Express backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── package.json
│
└── README.md

