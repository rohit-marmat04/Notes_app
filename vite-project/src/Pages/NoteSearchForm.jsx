import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function NoteSearchForm() {
  const [form, setForm] = useState({
    college: '',
    course: '',
    semester: '',
    subject: '',
    noteType: 'text',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (form.noteType === 'text') {
        // ✅ Text notes API
        const query = new URLSearchParams(form).toString();
        res = await axios.get(`http://localhost:5000/api/notes/getnotebyfilters?${query}`);

        if (!res.data || !res.data.noteId) {
          alert("No text notes found!");
          return;
        }

        const noteId = res.data.noteId;
        console.log('Text Note Id:', noteId);
        navigate(`/notes/${noteId}`);
      } else {
        // ✅ Handwritten notes API
        const query = new URLSearchParams({
          college: form.college,
          course: form.course,
          semester: form.semester,
          subject: form.subject,
        }).toString();

        res = await axios.get(`http://localhost:5000/api/notes/gethandwrittennotesbyfilters?${query}`);

        if (!res.data || res.data.length === 0) {
          alert("No handwritten notes found!");
          return;
        }

        // ✅ Assume API returns an array of handwritten notes
        const driveLink = res.data[0].driveLink;
        console.log('Handwritten Drive Link:', driveLink);
        window.location.href = driveLink; // redirect to Drive
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch notes.");
    }
  };

  return (
    <section className='bg-gray-800 h-screen'>
      <Navbar />
      <div className="max-w-xl mx-auto lg:mt-10 sm: m-3  p-6 bg-gray-900 rounded shadow border border-gray-400">
        <h2 className="text-xl font-semibold text-white mb-4">Search Notes</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="college" onChange={handleChange} placeholder="College" required className="w-full border p-2 rounded text-white" />
          <input type="text" name="course" onChange={handleChange} placeholder="Course" required className="w-full border p-2 rounded text-white" />
          <input type="number" name="semester" onChange={handleChange} placeholder="Semester" required className="w-full border p-2 rounded text-white" />
          <input type="text" name="subject" onChange={handleChange} placeholder="Subject" required className="w-full border p-2 rounded text-white" />

          {/* Note Type Dropdown */}
          <div>
            <label className="block mb-1 text-white">Note Type</label>
            <select
              name="noteType"
              value={form.noteType}
              onChange={handleChange}
              className="w-full border p-2 rounded text-white"
              required
            >
              <option value="text" className='text-black'>Text</option>
              <option value="handwritten" className='text-black'>Handwritten</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-white text-black py-2 rounded hover:bg-gray-400 hover:text-gray-800">
            View Notes
          </button>
        </form>
      </div>
    </section>
  );
}
