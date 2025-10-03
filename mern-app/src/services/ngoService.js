// src/services/ngoService.js

const API_URL = "http://localhost:5000/api/ngos";

const getToken = () => localStorage.getItem("token");

export async function getAllNgos() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch NGOs");
  return res.json();
}

export async function getNgoById(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch NGO");
  return res.json();
}

export async function createNgo(ngoData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(ngoData),
  });
  if (!res.ok) throw new Error("Failed to create NGO");
  return res.json();
}

export async function updateNgo(id, ngoData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(ngoData),
  });
  if (!res.ok) throw new Error("Failed to update NGO");
  return res.json();
}

export async function deleteNgo(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to delete NGO");
  return res.json();
}
