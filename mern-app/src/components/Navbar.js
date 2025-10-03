import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          FixMyTown
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-gray-700">
          <Link to="/" className="hover:text-blue-600">Home</Link>

          {user?.role === "user" && (
            <>
              <Link to="/report-issue" className="hover:text-blue-600">Report Issue</Link>
              <Link to="/my-issues" className="hover:text-blue-600">My Issues</Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/dashboard/admin" className="hover:text-blue-600">Admin Dashboard</Link>
          )}

          <Link to="/about" className="hover:text-blue-600">About</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 font-medium">
                👋 Hi, {user?.name} ({user?.role})
              </span>
              <Link
                to="/profile"
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-2">
          <Link to="/" className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded">
            Home
          </Link>

          {user?.role === "user" && (
            <>
              <Link to="/report-issue" className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded">
                Report Issue
              </Link>
              <Link to="/my-issues" className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded">
                My Issues
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/dashboard/admin" className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded">
              Admin Dashboard
            </Link>
          )}

          <Link to="/about" className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded">
            About
          </Link>

          <hr />

          {isLoggedIn ? (
            <>
              <span className="block px-2 text-gray-700 font-medium">
                👋 Hi, {user?.name} ({user?.role})
              </span>
              <Link
                to="/profile"
                className="block w-full px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-center"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
