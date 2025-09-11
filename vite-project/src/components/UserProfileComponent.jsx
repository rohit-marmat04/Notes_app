import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen">
  {/* Top Info */}
  <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-5 flex items-center space-x-5 border border-white/20">
    <img
      src="/avatar-placeholder.png"
      alt="Profile"
      className="w-16 h-16 rounded-full ring-2 ring-red-500"
    />
    <div>
      <h2 className="text-xl font-bold text-white">@{user.username}</h2>
      <p className="text-sm text-gray-400">🎓 College: {user.college || 'NA'}</p>
      <p className="text-sm text-gray-400">📅 Year: {user.passingYear || 'NA'}</p>
    </div>
    <button className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition px-3 py-1 rounded-lg text-white text-xs shadow-md">
      Private
    </button>
  </div>

  {/* Follow Section */}
  <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-5 flex justify-between text-sm border border-white/20">
    <div className="text-center">
      <p className="font-semibold text-gray-200">Followers</p>
      <p className="text-lg font-bold text-white">{user.followers}</p>
    </div>
    <div className="text-center">
      <p className="font-semibold text-gray-200">Following</p>
      <p className="text-lg font-bold text-white">{user.following}</p>
    </div>
    <div className="text-center">
      <p className="font-semibold text-gray-200">Placed</p>
      <p className={`text-lg font-bold ${user.placed ? 'text-green-400' : 'text-red-400'}`}>
        {user.placed ? "Yes" : "No"}
      </p>
    </div>
  </div>

  {/* Company Section */}
  <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-5 grid grid-cols-2 gap-4 text-sm border border-white/20">
    {["TCS", "Infosys", "Cognizant", "Wipro"].map(company => (
      <div key={company} className="p-3 rounded-lg hover:bg-white/5 transition">
        <p className="font-semibold text-gray-300">{company}</p>
        <p className="text-gray-400">-</p>
      </div>
    ))}
  </div>

  {/* About Me Section */}
  <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-5 text-sm space-y-2 border border-white/20">
    <h3 className="font-bold text-xl text-white">👤 About Me</h3>
    <p className="text-gray-300"><strong className="text-gray-200">Name:</strong> {user.name}</p>
    <p className="text-gray-300"><strong className="text-gray-200">Email:</strong> {user.email}</p>
  </div>

  {/* Elite Feature */}
  <div className="bg-gradient-to-br from-red-600 to-pink-600 shadow-xl rounded-2xl p-6 text-center space-y-3 border border-red-500/30">
    <h3 className="font-bold text-2xl text-white">🔥 What is PrepInsta Elite?</h3>
    <p className="text-sm text-red-100">
      Our Elite members are PrepInsta’s most valued members and this membership
      comes with a bunch of cool features mentioned below –
    </p>
    <button className="bg-white text-red-600 font-semibold px-5 py-2 rounded-full shadow-md hover:scale-105 transition">
      Join Now
    </button>
  </div>
</div>

  );
};

export default UserProfile;