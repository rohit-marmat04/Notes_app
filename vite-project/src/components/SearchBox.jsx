import React, { useState, useEffect } from 'react';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Search } from 'lucide-react';

const SearchBox = ({ placeholder = "", onSearchChange }) => {
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Fetch tags only once when component mounts
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/topics/alltopics");
        console.log("Fetched tags:", res.data);
        setAllTags(res.data);
        setFilteredTags(res.data);
      } catch (err) {
        console.error("Error fetching tags", err);
      }
    };
    fetchTags();
  }, []);

  const handleFocus = () => {
    if (!focused && location.pathname !== "/search") {
      setFocused(true);
    }
    setShowDropdown(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setShowDropdown(true);

    const filtered = allTags.filter(tag =>
      tag?.name?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredTags(filtered);

    if (onSearchChange) onSearchChange(value);
  };

  const handleSelect = (tag) => {
    setSearch(tag.name);
    console.log("Search", Search)
    setShowDropdown(false);
    navigate(`/tags/${tag.name}`);
  };

  return (
    <div className="relative w-full max-w-md">
      <div
        className={`h-12 rounded-xl border flex items-center transition-all duration-300 bg-gray-800 text-white shadow-lg overflow-hidden ${
          focused ? "border-yellow-400 ring-2 ring-yellow-400" : "border-gray-600"
        }`}
      >
        {/* Icon */}
        <button
          className="px-3 flex items-center justify-center hover:text-yellow-400 transition-colors"
          onClick={() => setFocused(!focused)}
        >
          {focused ? <FaArrowLeft size={18} /> : <FaSearch size={18} />}
        </button>

        {/* Animated Placeholder */}
        {!focused && !search && (
          <div className="absolute pl-11 text-sm text-gray-300 pointer-events-none">
            <TypeAnimation
              sequence={[
                "Search tags...",
                1500,
                "Search notes...",
                1500,
                "Search anything...",
                1500,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </div>
        )}

        {/* Input */}
        <input
          type="text"
          value={search}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          className="w-full h-full bg-transparent outline-none px-2 text-sm z-10 placeholder-gray-400"
          placeholder={placeholder}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && filteredTags.length > 0 && (
        <div className="absolute top-14 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto z-50">
          {filteredTags.map((tag, idx) => (
            <div
              key={idx}
              onMouseDown={() => handleSelect(tag)}
              className="px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-yellow-400 cursor-pointer transition-colors flex items-center gap-2"
            >
              {tag.color && (
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: tag.color }}
                ></span>
              )}
              {tag.name}
            </div>
          ))}
        </div>
      )}

      {/* No match found */}
      {showDropdown && search && filteredTags.length === 0 && (
        <div className="absolute top-14 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 px-4 py-2 text-sm text-gray-400">
          No matching tags found.
        </div>
      )}
    </div>
  );
};

export default SearchBox;
