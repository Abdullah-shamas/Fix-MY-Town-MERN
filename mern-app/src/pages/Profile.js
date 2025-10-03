import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  // Role badge color (NGO removed)
  const roleColors = {
    user: "bg-blue-500",
    admin: "bg-red-500",
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 text-center">
      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-yellow-400"
        />
      </div>

      {/* Name */}
      <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>

      {/* Role */}
      <p className="mt-2">
        <span
          className={`px-3 py-1 text-sm font-medium text-white rounded-full ${
            roleColors[user.role] || "bg-gray-500"
          }`}
        >
          {user.role.toUpperCase()}
        </span>
      </p>

      {/* Extra Info */}
      {user.createdAt && (
        <p className="mt-3 text-sm text-gray-500">
          Joined on {new Date(user.createdAt).toLocaleDateString()}
        </p>
      )}

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <button
          onClick={() => alert("Edit Profile coming soon!")}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
        >
          Edit Profile
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
