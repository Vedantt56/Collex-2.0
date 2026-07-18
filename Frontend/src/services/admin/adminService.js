import apiClient from "../apiClient";

const ADMIN_API = "/api/v1/admin";

export const loginAsAdmin = async (email, password) => {
  const response = await apiClient.post(`${ADMIN_API}/login`, { email, password });
  return response.data;
};

export const getAdminStats = async () => {
  const response = await apiClient.get(`${ADMIN_API}/stats`);
  return response.data;
};

export const getPendingUsers = async () => {
  const response = await apiClient.get(`${ADMIN_API}/pending-users`);
  return response.data;
};

export const getUsers = async () => {
  const response = await apiClient.get(`${ADMIN_API}/users`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`${ADMIN_API}/user/${id}`);
  return response.data;
};

export const approveUser = async (id) => {
  const response = await apiClient.put(`${ADMIN_API}/approve/${id}`);
  return response.data;
};

export const rejectUser = async (id) => {
  const response = await apiClient.put(`${ADMIN_API}/reject/${id}`);
  return response.data;
};

export const getListings = async () => {
  const response = await apiClient.get(`${ADMIN_API}/listings`);
  return response.data;
};

export const markListingSold = async (id) => {
  const response = await apiClient.put(`${ADMIN_API}/listings/${id}/sold`);
  return response.data;
};

export const removeListing = async (id) => {
  const response = await apiClient.put(`${ADMIN_API}/listings/${id}/remove`);
  return response.data;
};

export const deleteListing = async (id) => {
  const response = await apiClient.delete(`${ADMIN_API}/listings/${id}`);
  return response.data;
};
