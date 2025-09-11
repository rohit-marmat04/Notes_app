import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post("http://localhost:5000/api/email/emailsupport", formData);
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("❌ Failed to send. Try again.");
    }
  };

  return (
    <section className="bg-gray-900 h-screen">
        <Navbar />
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 h-auto rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-white">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-white">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded h-24"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
        >
          Send
        </button>
      </form>
      {status && <p className="mt-4 text-center text-white">{status}</p>}
    </div>
    </section>
  );
};

export default Support;
