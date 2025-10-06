// Footer.jsx
import { useNavigate } from "react-router-dom";

export default function Footer() {
const navigate = useNavigate();

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
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-400 mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} Noteshala. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={redirectToHome}
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={redirectToHome}

          >
            About
          </a>
          <a
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={redirectToFAQ}
          >
            FAQ
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={redirectToSupport}
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
