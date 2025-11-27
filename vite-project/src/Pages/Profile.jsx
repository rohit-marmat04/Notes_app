import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    college: "",
    degree: "",
    year: "",
    semester: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://notes-app-1-3rxs.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);

        // Prefill formData with existing user info if present
        setFormData({
          mobile: res.data.user.mobile || "",
          college: res.data.user.college || "",
          degree: res.data.user.degree || "",
          year: res.data.user.year || "",
          semester: res.data.user.semester || "",
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, []);

  console.log("User Data", user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://notes-app-1-3rxs.onrender.com/api/users/update",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data.user); // Update UI with new user data
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <section>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-sm text-gray-400">{user._id}</p>
          </div>

          {!isEditing ? (
            <>
              {/* Info Section */}
              <div className="bg-black/40 rounded-xl p-4 border border-white/10 space-y-2 text-left">
                <p className="text-gray-300">
                  <span className="font-semibold text-gray-200"> Email:</span>{" "}
                  {user.email}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-gray-200"> User ID:</span>{" "}
                  {user._id}
                </p>
                {user.mobile && (
                  <p className="text-gray-300">
                    <span className="font-semibold text-gray-200"> Mobile:</span>{" "}
                    {user.mobile}
                  </p>
                )}
                {user.college && (
                  <p className="text-gray-300">
                    <span className="font-semibold text-gray-200"> College:</span>{" "}
                    {user.college}
                  </p>
                )}
                {user.degree && (
                  <p className="text-gray-300">
                    <span className="font-semibold text-gray-200"> Degree:</span>{" "}
                    {user.degree}
                  </p>
                )}
                {user.year && (
                  <p className="text-gray-300">
                    <span className="font-semibold text-gray-200"> Year:</span>{" "}
                    {user.year}
                  </p>
                )}
                {user.semester && (
                  <p className="text-gray-300">
                    <span className="font-semibold text-gray-200"> Semester:</span>{" "}
                    {user.semester}
                  </p>
                )}
              </div>

              {/* Test Results Section */}
              {user.testResults && user.testResults.length > 0 && (
                <div className="bg-black/40 rounded-xl p-4 border border-white/10 space-y-3 text-left">
                  <h3 className="text-lg font-semibold text-white"> Test History</h3>
                  {user.testResults.map((test, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-gray-800/50 text-gray-300"
                    >
                      <p>
                        <span className="font-semibold text-gray-200">📌 Test:</span>{" "}
                        {test.testTitle}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-200">✅ Score:</span>{" "}
                        {test.score}/{test.totalQuestions}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-200">📝 Attempted:</span>{" "}
                        {test.attempted}
                      </p>
                      <p className="text-sm text-gray-400">
                        Submitted: {new Date(test.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black hover:text-gray-800 hover:opacity-90 transition px-5 py-2 rounded-full font-semibold shadow-md"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {/* Edit Form */}
              <form
                onSubmit={handleSave}
                className="bg-black/40 rounded-xl p-4 border border-white/10 space-y-4 text-left"
              >
                <div>
                  <label className="block text-gray-300 text-sm"> Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm"> College</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm"> Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm"> Year</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm"> Semester</label>
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 px-4 py-2 rounded text-white font-semibold hover:opacity-90"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-red-600 px-4 py-2 rounded text-white font-semibold hover:opacity-90"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
