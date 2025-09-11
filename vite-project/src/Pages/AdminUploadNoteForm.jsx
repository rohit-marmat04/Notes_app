import { useState } from 'react';
import axios from 'axios';

export default function AdminUploadNoteForm() {
  const [form, setForm] = useState({
    college: '',
    course: '',
    semester: '',
    subject: '',
    noteTitle: '',
    noteType: 'text',
    storageUrl: '', // only for handwritten
  });
  
  const [file, setFile] = useState(null);

  console.log('Submitting form', form)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    if (form.noteType === 'text' && file) {
      data.append('file', file);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/notes/upload', data);
      alert('Note uploaded successfully!');
      setForm({
        college: '',
        course: '',
        semester: '',
        subject: '',
        noteTitle: '',
        noteType: 'text',
        storageUrl: '',
      });
      setFile(null);
    } catch (err) {
      alert('Error uploading note');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Admin Note Upload</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* College */}
        <div>
          <label className="block text-gray-600">College</label>
          <input
            type="text"
            name="college"
            value={form.college}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Course */}
        <div>
          <label className="block text-gray-600">Course</label>
          <input
            type="text"
            name="course"
            value={form.course}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Semester */}
        <div>
          <label className="block text-gray-600">Semester</label>
          <input
            type="number"
            name="semester"
            value={form.semester}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-gray-600">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Note Title */}
        <div>
          <label className="block text-gray-600">Note Title</label>
          <input
            type="text"
            name="noteTitle"
            value={form.noteTitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Note Type */}
        <div>
          <label className="block text-gray-600">Note Type</label>
          <select
            name="noteType"
            value={form.noteType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="text">Text</option>
            <option value="handwritten">Handwritten</option>
          </select>
        </div>

        {/* File Upload or Google Drive Link */}
        {form.noteType === 'text' ? (
          <div>
            <label className="block text-gray-600">Upload Text File (.txt, .md, .pdf)</label>
            <input
              type="file"
              accept=".txt,.md,.pdf"
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ) : (
          <div>
            <label className="block text-gray-600">Google Drive Link (for handwritten)</label>
            <input
              type="url"
              name="storageUrl"
              value={form.storageUrl}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              className="w-full border p-2 rounded"
              required
            />
          </div>
        )}

        {/* Submit */}
        <div className="text-center pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Upload Note
          </button>
        </div>
      </form>
    </div>
  );
}