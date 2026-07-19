import apiClient from "./apiClient";

const API_URL = `${import.meta.env.VITE_AUTH_URL || ""}/api/v1/auth`;

export const loginUser = async (
  email,
  password
) => {
  const response = await apiClient.post(
    `${API_URL}/login`,
    {
      email,
      password,
    }
  );

  const { token } = response.data;
  const profile = await getCurrentUser(token);

  return {
    ...response.data,
    user: profile.user,
  };
};

export const signupUser = async (payload) => {
  const response = await apiClient.post(
    `${API_URL}/signup`,
    payload
  );

  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await apiClient.get(
    `${API_URL}/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post(
    `${API_URL}/logout`
  );

  return response.data;
};

export const resetPassword = async (email, password) => {
  const response = await apiClient.post(
    `${API_URL}/reset-password`,
    {
      email,
      password,
    }
  );

  return response.data;
};
