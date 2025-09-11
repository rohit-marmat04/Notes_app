import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCardManager = () => {
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', buttonText: '', slug: '', });

  const fetchCards = async () => {
    const res = await axios.get('http://localhost:5000/api/cards/getcard');
    setCards(res.data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("Token here ", token)

    await axios.post('http://localhost:5000/api/cards/createcard', form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setForm({ title: '', description: '', buttonText: '', slug: '', });
    console.log("Setting form value ", setForm);
    fetchCards();
  };

  const handleDelete = async (cardId) => {
  const token = localStorage.getItem("token"); // Replace "token" with your actual key

  try {
    await axios.delete(`http://localhost:5000/api/cards/deletecard/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCards((prev) => prev.filter((card) => card._id !== cardId));
  } catch (err) {
    console.error("Failed to delete card:", err);
  }
};


  return (
    <section className='w-full container mx-auto px-2 bg-white mt-20'>
        <div className='text-black w-full max-w-lg mx-auto rounded p-7 bg-white border border-black'>
      <h2 className="text-xl font-bold mb-4">Manage Learning Path Cards</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={(e) => {
          const newTitle = e.target.value;
          const generatedSlug = newTitle.toLowerCase().replace(/\s+/g, '-');
          console.log("Slug and title input value:", generatedSlug, newTitle);
          setForm({ ...form, title: newTitle, slug: generatedSlug });
        }}

          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Button Text"
          className="border p-2 w-full"
          value={form.buttonText}
          onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Card
        </button>
      </form>

      <div className="grid gap-4">
        {cards.map(card => (
          <div key={card._id} className="border p-4 rounded shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.description}</p>
              <p className="text-sm italic">Button: {card.buttonText}</p>
            </div>
            <button
              onClick={() => handleDelete(card._id)}
              className="text-red-600 font-bold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </section>
    
  );
};

export default AdminCardManager;