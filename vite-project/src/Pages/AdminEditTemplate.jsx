import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [templates, setTemplates] = useState([]);
  const [newTemplate, setNewTemplate] = useState({
    slug: "",
    title: "",
    description: "",
    sections: "",
    topics: [{ title: "", tags: "" }],
  });
  const [editingTemplate, setEditingTemplate] = useState(null);

  // Fetch all templates
  const fetchTemplates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/template");
      setTemplates(res.data);
    } catch (err) {
      console.error("Error fetching templates:", err);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Convert string tags -> array of objects
  const formatTopicsForSave = (topics) =>
    topics.map((t) => ({
      title: t.title,
      tags: t.tags
        .split(",")
        .map((tag) => ({ name: tag.trim(), color: "blue" })), // default color
    }));

  // Add Template
  const handleAddTemplate = async () => {
    try {
      await axios.post("http://localhost:5000/api/template/updatetemplate", {
        ...newTemplate,
        sections: newTemplate.sections.split(",").map((s) => s.trim()),
        topics: formatTopicsForSave(newTemplate.topics),
      });
      alert("Template added!");
      setNewTemplate({
        slug: "",
        title: "",
        description: "",
        sections: "",
        topics: [{ title: "", tags: "" }],
      });
      fetchTemplates();
    } catch (err) {
      console.error("Error adding template:", err);
      alert("Add failed");
    }
  };

  // Delete Template
  const handleDeleteTemplate = async (slug) => {
    if (!window.confirm("Delete this template?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/template/${slug}`);
      alert("Template deleted!");
      fetchTemplates();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  // Update Template
  const handleUpdateTemplate = async () => {
    try {
      await axios.post("http://localhost:5000/api/template/updatetemplate", {
        ...editingTemplate,
        sections: editingTemplate.sections.split(",").map((s) => s.trim()),
        topics: formatTopicsForSave(editingTemplate.topics),
      });
      alert("Template updated!");
      setEditingTemplate(null);
      fetchTemplates();
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed");
    }
  };

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📋 Admin Dashboard</h1>

      {/* Add New Template */}
      <div className="p-4 border rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">➕ Add New Template</h2>
        <input
          type="text"
          placeholder="Slug"
          value={newTemplate.slug}
          onChange={(e) =>
            setNewTemplate({ ...newTemplate, slug: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Title"
          value={newTemplate.title}
          onChange={(e) =>
            setNewTemplate({ ...newTemplate, title: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Description"
          value={newTemplate.description}
          onChange={(e) =>
            setNewTemplate({ ...newTemplate, description: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Sections (comma separated)"
          value={newTemplate.sections}
          onChange={(e) =>
            setNewTemplate({ ...newTemplate, sections: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />

        {/* Topics */}
        <h3 className="font-semibold mb-2">Topics</h3>
        {newTemplate.topics.map((topic, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Topic Title"
              value={topic.title}
              onChange={(e) => {
                const topics = [...newTemplate.topics];
                topics[i].title = e.target.value;
                setNewTemplate({ ...newTemplate, topics });
              }}
              className="border p-2 flex-1"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={topic.tags}
              onChange={(e) => {
                const topics = [...newTemplate.topics];
                topics[i].tags = e.target.value;
                setNewTemplate({ ...newTemplate, topics });
              }}
              className="border p-2 flex-1"
            />
            <button
              onClick={() => {
                const topics = [...newTemplate.topics];
                topics.splice(i, 1);
                setNewTemplate({ ...newTemplate, topics });
              }}
              className="bg-red-500 text-white px-2 rounded"
            >
              ❌
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setNewTemplate({
              ...newTemplate,
              topics: [...newTemplate.topics, { title: "", tags: "" }],
            })
          }
          className="bg-blue-500 text-white px-3 py-1 rounded mb-3"
        >
          ➕ Add Topic
        </button>

        <button
          onClick={handleAddTemplate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      {/* Template List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📑 Available Templates</h2>
        <div className="grid gap-4">
          {templates.map((t) => (
            <div key={t.slug} className="p-4 border rounded">
              {editingTemplate?.slug === t.slug ? (
                <>
                  <input
                    type="text"
                    value={editingTemplate.title}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate,
                        title: e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-2"
                  />
                  <textarea
                    value={editingTemplate.description}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate,
                        description: e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="text"
                    value={editingTemplate.sections}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate,
                        sections: e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-2"
                  />

                  {/* Edit Topics */}
                  <h3 className="font-semibold mb-2">Topics</h3>
                  {editingTemplate.topics.map((topic, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={topic.title}
                        onChange={(e) => {
                          const topics = [...editingTemplate.topics];
                          topics[i].title = e.target.value;
                          setEditingTemplate({ ...editingTemplate, topics });
                        }}
                        className="border p-2 flex-1"
                      />
                      <input
                        type="text"
                        value={topic.tags}
                        onChange={(e) => {
                          const topics = [...editingTemplate.topics];
                          topics[i].tags = e.target.value;
                          setEditingTemplate({ ...editingTemplate, topics });
                        }}
                        className="border p-2 flex-1"
                      />
                      <button
                        onClick={() => {
                          const topics = [...editingTemplate.topics];
                          topics.splice(i, 1);
                          setEditingTemplate({ ...editingTemplate, topics });
                        }}
                        className="bg-red-500 text-white px-2 rounded"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      setEditingTemplate({
                        ...editingTemplate,
                        topics: [
                          ...editingTemplate.topics,
                          { title: "", tags: "" },
                        ],
                      })
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded mb-3"
                  >
                    ➕ Add Topic
                  </button>

                  <div className="space-x-2">
                    <button
                      onClick={handleUpdateTemplate}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={() => setEditingTemplate(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold">{t.title}</h3>
                  <p>{t.description}</p>
                  <p>
                    <strong>Sections:</strong> {t.sections?.join(", ")}
                  </p>
                  <div>
                    <strong>Topics:</strong>
                    {t.topics?.map((topic, i) => (
                      <p key={i}>
                        {topic.title} (
                        {topic.tags?.map((tag) => tag.name).join(", ")})
                      </p>
                    ))}
                  </div>
                  <div className="space-x-2 mt-2">
                    <button
                      onClick={() =>
                        setEditingTemplate({
                          ...t,
                          sections: t.sections.join(","),
                          topics: t.topics.map((tp) => ({
                            title: tp.title,
                            tags: tp.tags.map((tg) => tg.name).join(","),
                          })),
                        })
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(t.slug)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
