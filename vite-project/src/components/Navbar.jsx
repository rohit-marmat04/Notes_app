import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineContactSupport, MdSupportAgent } from "react-icons/md";
import {
  Menu,
  Bell,
  UserCircle,
  User,
  Search,
  Home,
  Code2,
  Briefcase,
  LogOut,
  BookUser,
} from "lucide-react";
import SearchBox from "../components/SearchBox.jsx";
import logo from "../assets/NoteShala_Logo-removebg-preview.png";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Watch login status
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
  };

  const redirectToProfile = () =>{
    navigate("/profile");
  }

  const redirectToPrepare = () =>{
    navigate("/notes");
  }

  const redirectToHandwritten = () =>{
    navigate("/gethand");
  }
  const redirectToNotification = () =>{
    navigate("/notifications");
  }

  const redirectToHome = () =>{
    navigate("/");
  }

  const redirectToFAQ = () =>{
    navigate("/faq");
  }

  const redirectToSupport = () =>{
    navigate("/support");
  }

  return (
 <>
  {/* Top Navbar */}
  <header className="w-full px-4 py-3 border-b shadow-md bg-gray-900 flex items-center justify-between relative">
    {/* Left: Hamburger + Logo */}
    <div className="flex items-center gap-3">
      <button className="sm:hidden">
        {/* <Menu className="w-6 h-6 text-gray-200" /> */}
      </button>

      {/* Logo + Text */}
      <div
        className="cursor-pointer"
        onClick={redirectToHome}
      >
              <img
  src={logo}
  alt="NoteShala Logo"
  className="h-10 ml-0 sm:h-12 md:h-14 lg:h-16 object-contain cursor-pointer"
/>
      </div>


    </div>

    {/* Center: Search Bar */}
    <div className="hidden lg:flex items-center w-full max-w-md mx-4 ">
      <div className="relative w-full">
        <SearchBox />
      </div>
    </div>

    {/* Right: Bell, Login/Profile, Prime */}
    <div className="flex items-center gap-4 relative">
      <Bell
        className="w-5 h-5 text-white sm:inline"
        onClick={redirectToNotification}
      />

      {isLoggedIn ? (
        <>
          <UserCircle
            onClick={() => setShowDropdown((prev) => !prev)}
            className="h-8 w-8 bg-black flex items-center justify-center font-semibold text-white cursor-pointer"
          />

          {/* Dropdown */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-12 w-40 bg-gray-900 text-white border rounded-md shadow-md z-50"
            >
              <ul className="flex flex-col text-sm">
                <li
                  className="px-4 py-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer"
                  onClick={redirectToProfile}
                >
                  <User className="w-4 h-4" /> Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer"
                  onClick={redirectToPrepare}
                >
                  <BookUser className="w-4 h-4" /> Notes
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer"
                  onClick={redirectToHandwritten}
                >
                  <BookUser className="w-4 h-4" /> Handwritten Notes
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-3 py-1 h-[30px] w-15 bg-white hover:bg-white text-black text-sm rounded-md"
        >
          Login
        </button>
      )}

      {/* Prime Button */}
      {/* <button className="hidden sm:inline h-[30px] px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md">
        Get Prime →
      </button> */}
    </div>
  </header>

  {/* Bottom Search on Mobile */}
  <div className="lg:hidden px-4 py-2 border bg-gray-900">
    <div className="relative">
      <SearchBox />
    </div>
  </div>

  {/* Mobile Bottom Navigation */}
  <nav className="fixed bottom-0 left-0 w-full bg-gray-900 border-t shadow-md flex justify-around items-center py-2 sm:hidden z-50">
    <button className="flex flex-col items-center text-xs text-white">
      <Home className="w-5 h-5 mb-0.5" onClick={redirectToHome} />
      Home
    </button>
    <button className="flex flex-col items-center text-xs text-white">
      <MdOutlineContactSupport className="w-5 h-5 mb-0.5" onClick={redirectToFAQ}/>
      FAQ's
    </button>
    <button className="flex flex-col items-center text-xs text-white">
      <Bell className="w-5 h-5 mb-0.5" onClick={redirectToNotification} />
      Notifications
    </button>
    <button className="flex flex-col items-center text-xs text-white" onClick={redirectToSupport}>
      <MdSupportAgent className="w-5 h-5 mb-0.5" />
      Support
    </button>
    {/* <button className="flex flex-col items-center text-xs text-green-600 font-semibold">
      <span className="text-sm">↗</span>
      Prime
    </button> */}
  </nav>
</>
  );
};

export default Navbar;
