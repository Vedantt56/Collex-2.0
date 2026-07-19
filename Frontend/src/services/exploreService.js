import apiClient from "./apiClient";

const API_URL =
  `${import.meta.env.VITE_EXPLORE_URL || ""}/api/v1`;

export const getExploreListings = async (params = {}) => {
  const response = await apiClient.get(`${API_URL}/explore`, {
    params,
  });

  return response.data;
};

export const getExploreListingById = async (id) => {
  const response = await apiClient.get(
    `${API_URL}/explore/${id}`
  );

  return response.data;
};

export const searchListings = async (q) => {
  const response = await apiClient.get(`${API_URL}/search`, {
    params: { q },
  });

  return response.data;
};
