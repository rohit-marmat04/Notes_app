import express from 'express';
import connectDB from './config/connectDB.js';
import userRouter from './routes/user.route.js'
import cardRouter from './routes/card.route.js'
import templateRouter from './routes/template.route.js'
import questionRouter from './routes/question.route.js';
import notificationRouter from './routes/notification.route.js';
import ProblemRouter from './routes/problemRoutes.js';
import topicRouter from './routes/topics.route.js'
import testRouter from './routes/test.route.js';
import authRouter from './routes/auth.route.js';
import emailRouter from './routes/contact.route.js';
import { upload } from './middleware/uploadMiddleware.js';
import path from 'path';
import multer from 'multer';
import notesRouter from './routes/notes.route.js';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

app.use(cors({
  origin: "*", // Exact frontend origin
  credentials: true               // Allow cookies/auth headers
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRouter); 
app.use('/api/cards', cardRouter);
app.use('/api/template', templateRouter);
app.use('/api/questions', questionRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/notes', notesRouter);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use('/api/topics', topicRouter)
app.use('/api/test', testRouter);
app.use('/api/problems', ProblemRouter);
app.use('/api/auth', authRouter);
app.use('/api/email', emailRouter);

// Default Route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
