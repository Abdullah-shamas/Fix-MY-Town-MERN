import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "road",
  });

  const [message, setMessage] = useState(null); // { type: "success" | "error", text: string }
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/issues",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({ type: "success", text: "✅ Issue reported successfully!" });
      setFormData({ title: "", description: "", location: "", category: "road" });

      console.log(res.data);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/my-issues");
      }, 2000);
    } catch (error) {
      setMessage({ type: "error", text: "❌ Failed to report issue" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Report an Issue
        </h2>

        {/* Alert Box */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-white font-medium text-center ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
            {message.type === "success" && (
              <p className="mt-2 text-sm">Redirecting to My Issues...</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              <option value="road">Road</option>
              <option value="electricity">Electricity</option>
              <option value="sanitation">Sanitation</option>
              <option value="water">Water</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg shadow-md transition flex items-center justify-center
              ${
                loading
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 text-white"
              }`}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Issue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;
