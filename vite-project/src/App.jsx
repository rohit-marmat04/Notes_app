import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import Home from './Pages/Home.jsx'
import Aptitude from './Pages/Aptitude.jsx'
import AdminCardManager from './Pages/AdminCardManager.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Unauthorized from './Pages/Unauthorized.jsx'
import AdminAddQuestion from './Pages/AdminAddQuestion.jsx'
import TagPage from './Pages/Tags.jsx'
import AdminDeleteTemplate from './Pages/AdminDeleteTemplate.jsx'
import Profile from './Pages/profile.jsx'
import AdminAddTest from './Pages/AdminAddTest.jsx'
import Notification from './Pages/Notification.jsx'
import ProblemViewer from './Pages/ProblemViewer.jsx'
import NoteViewer from './components/Noteviewer.jsx'
import ProblemList from './Pages/ProblemList.jsx'
import AdminForm from './Pages/AdminAddProblem.jsx'
import Driveee from './Pages/Drivee.jsx'
import Test from './Pages/Test.jsx'
import AdminEditNotification from './Pages/AdminEditNotifications.jsx'
import NoteSearchForm from './Pages/NoteSearchForm.jsx'
import AdminUploadNoteForm from './Pages/AdminUploadNoteForm.jsx'
import AddHandwrittenNote from './Pages/AddHandwrittenNote.jsx'
import SearchPage from './Pages/SearchPage.jsx'
import TemplatePage from './Pages/TemplatePage.jsx'
import Prepare from './Pages/Prepare.jsx'
import HandwrittenNote from './Pages/HandwrittenNote.jsx'
import Faq from './Pages/Faq.jsx'
import Support from './Pages/Support.jsx'
import { Toaster } from 'react-hot-toast' // ✅ import Toaster
import AdminEditTemplate from './Pages/AdminEditTemplate.jsx'
import HandwrittenModel from '../../Backend/models/handwritten.model.js'


function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add Toaster here */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/prepare" element={<Prepare />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/support" element={<Support />} />
        <Route path="/admin/editnotifications" element={<ProtectedRoute allowedRole="ADMIN"><AdminEditNotification /> </ProtectedRoute>} />
        <Route path="/template/:slug" element={<TemplatePage />} />
        <Route path="/gethand" element={<Driveee />} />
        <Route path="/notes" element={<NoteSearchForm />} />
        <Route path="/admin/handwritten" element={<ProtectedRoute allowedRole="ADMIN"><HandwrittenNote/></ProtectedRoute>} />
        <Route path="/notes/:id" element={<NoteViewer />} />
        <Route path="/admin/editnotes" element={<ProtectedRoute allowedRole="ADMIN"><AdminUploadNoteForm/></ProtectedRoute>} />
        <Route path="/problems/:id" element={<ProblemViewer />} />
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/admin/addproblem" element={<ProtectedRoute allowedRole="ADMIN"><AdminForm/></ProtectedRoute>} />
        <Route path="/test" element={<Test />} />
        <Route path="/admin/deletetemplate" element={<ProtectedRoute allowedRole="ADMIN"><AdminDeleteTemplate/></ProtectedRoute>} />
        <Route path="/admin/addtest" element={<ProtectedRoute allowedRole="ADMIN"><AdminAddTest/></ProtectedRoute>} />
        <Route path="/admin/cardmanager" element={<ProtectedRoute allowedRole="ADMIN"><AdminCardManager/></ProtectedRoute>} />
        <Route path="/admin/cards" element={
          <ProtectedRoute allowedRole="ADMIN"> 
          <AdminCardManager /> </ProtectedRoute>} />
      <Route path="/admin/edittemplate" element={
          <ProtectedRoute allowedRole="ADMIN"> 
          <AdminEditTemplate /> </ProtectedRoute>} />
          <Route path="/admin/addquestion" element={
          <ProtectedRoute allowedRole="ADMIN"> 
          <AdminAddQuestion /> </ProtectedRoute>} />
        <Route path="/tags/:tagName" element={<TagPage />} />
      </Routes>
    </Router>
  )
}

export default App
