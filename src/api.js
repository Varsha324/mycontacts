import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend's base URL
});

// Add token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (data) => API.post("/api/user/login", data);
export const register = (data) => API.post("/api/user/register", data);
export const getContacts = () => API.get("/api/contacts");
export const createContact = (data) => API.post("/api/contacts", data);
export const updateContact = (id, data) => API.put(`/api/contacts/${id}`, data);
export const deleteContact = (id) => API.delete(`/api/contacts/${id}`);
export const getContact = (id) => API.get(`/api/contacts/${id}`);