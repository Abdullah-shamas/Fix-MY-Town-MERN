const API_URL = "https://fix-my-town-mern-4p5y.vercel.app//api/issues";

const getToken = () => localStorage.getItem("token");

export async function getAllIssues() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch issues");
  return res.json();
}

export async function getAssignedIssues() {
  const res = await fetch(`${API_URL}/assigned`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch assigned issues");
  return res.json();
}

export async function createIssue(issueData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(issueData),
  });
  if (!res.ok) throw new Error("Failed to create issue");
  return res.json();
}

export async function updateIssueStatus(id, status) {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}

export async function deleteIssue(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to delete issue");
  return res.json();
}
