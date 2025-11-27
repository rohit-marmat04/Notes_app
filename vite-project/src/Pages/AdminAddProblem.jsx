// pages/AdminForm.jsx
import { useState } from "react";
import axios from "axios";

export default function AdminForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    examples: "",
    constraints: "",
    hints: "",
    approaches: "",
    code: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://notes-app-1-3rxs.onrender.com/api/problems", form);
    alert("Problem added successfully!");
    setForm({
      title: "",
      description: "",
      examples: "",
      constraints: "",
      hints: "",
      approaches: "",
      code: "",
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Problem</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {Object.keys(form).map((key) => (
          <textarea
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={`Enter ${key}`}
            className="p-3 border rounded"
            rows={key === "description" || key === "code" ? 5 : 3}
          />
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
