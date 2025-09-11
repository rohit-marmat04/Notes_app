import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TemplateCard = ({ template, onDelete }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(`Are you sure you want to delete "${template.title}"?`);
    if (!confirm) return;

    try {
      setLoading(true);
      const res = await axios.delete(`/api/templates/${template.slug}`);
      alert(res.data.message);
      onDelete(template.slug); // callback to remove from UI
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 hover:shadow-lg transition w-full sm:w-[48%] md:w-[32%]">
      <h3 className="text-xl font-bold text-gray-800 mb-3">{template.title}</h3>
      <p className="text-gray-600 mb-4">{template.description}</p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/edit/${template.slug}`)}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
