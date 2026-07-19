import apiClient from "./apiClient";

const API_URL =
  `${import.meta.env.VITE_LISTING_URL || ""}/api/v1/listings`;

export const createListing = async (listing) => {
  const response = await apiClient.post(API_URL, listing);

  return response.data;
};

export const getMyListings = async () => {
  const response = await apiClient.get(`${API_URL}/my`);

  return response.data;
};

export const getListingById = async (id) => {
  const response = await apiClient.get(`${API_URL}/${id}`);

  return response.data;
};

export const updateListing = async (id, listing) => {
  const response = await apiClient.put(
    `${API_URL}/${id}`,
    listing
  );

  return response.data;
};

export const deleteListing = async (id) => {
  const response = await apiClient.delete(`${API_URL}/${id}`);

  return response.data;
};
