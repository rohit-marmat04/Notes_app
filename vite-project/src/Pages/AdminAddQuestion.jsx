import { useState } from 'react';
import axios from 'axios';

const AdminAddQuestion = () => {
  const [form, setForm] = useState({
    topic: '',
    category: 'prepare',
    question: '',
    options: ['', '', '', ''],
    solution: '',
    correctIndex: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateOption = (value, index) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://notes-app-1-3rxs.onrender.com/api/questions/addquestion', form);
      alert('Question added successfully!');
      setForm({
        topic: '',
        category: 'prepare',
        question: '',
        options: ['', '', '', ''],
        solution: '',
        correctIndex: 0,
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add question');
    }
  };

  return (
    <section className='w-full container mx-auto px-2 bg-white mt-20'>
        <div className='text-black w-full max-w-lg mx-auto rounded p-7 bg-white border border-black'>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white shadow rounded max-w-xl mx-auto">
      <input
        type="text"
        name="topic"
        placeholder="Topic name (e.g. ratio)"
        value={form.topic}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="prepare">Prepare</option>
        <option value="assessment">Assessment</option>
      </select>
      <textarea
        name="question"
        placeholder="Full Question"
        value={form.question}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      {form.options.map((opt, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => updateOption(e.target.value, idx)}
          className="border p-2 w-full"
          required
        />
      ))}
      <textarea
        name="solution"
        placeholder="Solution to the question"
        value={form.solution}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="correctIndex"
        value={form.correctIndex}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="Correct option index (0-3)"
        min={0}
        max={3}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Question
      </button>
    </form>
    </div>
    </section>
    
  );
};

export default AdminAddQuestion;
