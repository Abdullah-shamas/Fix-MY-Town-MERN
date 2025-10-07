import { useEffect, useState } from "react";

function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      const res = await fetch("https://fix-my-town-mern-4p5y.vercel.app/api/issues/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch issues");
      }

      const data = await res.json();
      setIssues(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Reported Issues</h2>
        <button
          onClick={fetchIssues}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {/* Loading */}
      {loading && !error && (
        <div className="text-blue-600 font-medium">Loading issues...</div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* No issues */}
      {!loading && !error && issues.length === 0 && (
        <div className="text-gray-600">No issues reported yet.</div>
      )}

      {/* Issues List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-yellow-600">
              {issue.title}
            </h3>
            <p className="text-gray-700 mt-2">{issue.description}</p>

            <div className="mt-3 text-sm text-gray-500 space-y-1">
              <p><span className="font-semibold">Category:</span> {issue.category}</p>
              {issue.location && (
                <p><span className="font-semibold">Location:</span> {issue.location}</p>
              )}
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    issue.status === "resolved"
                      ? "bg-green-500"
                      : issue.status === "in-progress"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {issue.status}
                </span>
              </p>
              <p>
                <span className="font-semibold">Created:</span>{" "}
                {new Date(issue.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyIssues;
