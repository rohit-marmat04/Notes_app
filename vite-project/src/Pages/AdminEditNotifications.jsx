import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminEditNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({
    title: '',
    type: 'job',
    description: '',
    link: '',
    buttonLabel: 'Apply'
  });
  const [editingId, setEditingId] = useState(null);

  const fetchNotifications = async () => {
    try{
      const res = await axios.get('http://localhost:5000/api/notifications/getnotifications');
       if (Array.isArray(res.data.notifications)) {
      setNotifications(res.data.notifications);
    } else {
      console.warn("Notifications data is not an array:", res.data);
      setNotifications([]);
    }
  } catch (err) {
    console.error("Error fetching notifications", err);
    setNotifications([]);
  }

  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/notifications/updatenotifications${editingId}`, form);
      } else {
        await axios.post('http://localhost:5000/api/notifications/addnotifications', form);
      }
      setForm({ title: '', type: 'job', description: '', link: '', buttonLabel: 'Apply' });
      setEditingId(null);
      fetchNotifications();
    } catch (err) {
      console.error('Error submitting notification', err);
    }
  };

  const handleEdit = (notification) => {
    setForm(notification);
    setEditingId(notification._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/deletenotifications${id}`);
      fetchNotifications();
    } catch (err) {
      console.error('Error deleting notification', err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Notification Manager</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
        <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="job">Job</option>
          <option value="internship">Internship</option>
          <option value="training">Training</option>
          <option value="other">Other</option>
        </select>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <input name="link" value={form.link} onChange={handleChange} placeholder="Link" className="w-full p-2 border rounded" />
        <input name="buttonLabel" value={form.buttonLabel} onChange={handleChange} placeholder="Button Label" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? 'Update' : 'Add'} Notification
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Existing Notifications</h3>
        {notifications.map((n) => (
          <div key={n._id} className="bg-gray-100 p-3 rounded mb-2 flex justify-between items-center">
            <div>
              <p className="font-bold">{n.title} ({n.type})</p>
              <p>{n.description}</p>
              <a href={n.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{n.buttonLabel}</a>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(n)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
              <button onClick={() => handleDelete(n._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEditNotification;
