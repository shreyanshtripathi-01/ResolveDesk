import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getComplaints = () => api.get("/complaints");

export const createComplaint = (complaint) => api.post("/complaints", complaint);

export const updateComplaint = (id, status) => api.put(`/complaints/${id}`, { status });

export const deleteComplaint = (id) => api.delete(`/complaints/${id}`);

export default api;