import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardNGO() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/issues/assigned", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // yahan pe ensure kar rahe hain ke hamesha array mile
        setIssues(Array.isArray(data) ? data : data.issues || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch assigned issues");
        setLoading(false);
      });
  };

  const handleUpdate = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/issues/${id}/progress`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update progress");

      setIssues((prev) =>
        prev.map((i) => (i._id === id ? { ...i, status: newStatus } : i))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800 px-2 py-1 rounded";
      case "In Progress":
        return "bg-blue-200 text-blue-800 px-2 py-1 rounded";
      case "Completed":
        return "bg-green-200 text-green-800 px-2 py-1 rounded";
      default:
        return "bg-gray-200 text-gray-800 px-2 py-1 rounded";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Assigned Issues</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading issues...</p>
      ) : issues.length === 0 ? (
        <p>No assigned issues.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td className="border p-2">{issue.title}</td>
                <td className="border p-2">{issue.location}</td>
                <td className="border p-2">
                  <span className={getStatusClass(issue.status)}>
                    {issue.status}
                  </span>
                </td>
                <td className="border p-2">
                  <select
                    value={issue.status}
                    onChange={(e) => handleUpdate(issue._id, e.target.value)}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
