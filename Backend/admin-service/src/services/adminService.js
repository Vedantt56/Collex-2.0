const User = require("../models/User");

const LISTING_SERVICE_URL = process.env.LISTING_SERVICE_URL || "http://listing-service:5002";

const getUsers = async (query = {}) => {
  return User.find(query).select("-password").sort({ createdAt: -1 });
};

const getPendingUsers = async () => {
  return User.find({ verificationStatus: "pending" }).select("-password").sort({ createdAt: -1 });
};

const getUserById = async (id) => {
  return User.findById(id).select("-password");
};

const approveUser = async (id) => {
  return User.findByIdAndUpdate(id, { verificationStatus: "approved" }, { new: true }).select("-password");
};

const rejectUser = async (id) => {
  return User.findByIdAndUpdate(id, { verificationStatus: "rejected" }, { new: true }).select("-password");
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

const getListings = async (token) => {
  const response = await fetch(`${LISTING_SERVICE_URL}/listings/admin/all`, {
    headers: {
      Authorization: token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch listings from Listing Service");
  }
  const data = await response.json();
  return data.data;
};

const getListingById = async (id, token) => {
  const response = await fetch(`${LISTING_SERVICE_URL}/listings/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch listing from Listing Service");
  }
  const data = await response.json();
  return data.data;
};

const deleteListing = async (id, token) => {
  const response = await fetch(`${LISTING_SERVICE_URL}/listings/admin/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete listing from Listing Service");
  }
  return true;
};

const markListingSold = async (id, token) => {
  const response = await fetch(`${LISTING_SERVICE_URL}/listings/admin/${id}/sold`, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to mark listing as sold");
  }
  const data = await response.json();
  return data.data;
};

const removeListing = async (id, token) => {
  const response = await fetch(`${LISTING_SERVICE_URL}/listings/admin/${id}/remove`, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to hide listing");
  }
  const data = await response.json();
  return data.data;
};

const getStats = async (token) => {
  const [totalUsers, approvedUsers, pendingUsers, rejectedUsers] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ verificationStatus: "approved" }),
    User.countDocuments({ verificationStatus: "pending" }),
    User.countDocuments({ verificationStatus: "rejected" }),
  ]);

  let totalListings = 0;
  let activeListings = 0;
  try {
    const response = await fetch(`${LISTING_SERVICE_URL}/listings/admin/stats`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      totalListings = data.data.totalListings || 0;
      activeListings = data.data.activeListings || 0;
    }
  } catch (error) {
    console.error("Failed to fetch stats from Listing Service:", error.message);
  }

  return {
    totalUsers,
    approvedUsers,
    pendingUsers,
    rejectedUsers,
    totalListings,
    activeListings,
  };
};

module.exports = {
  getUsers,
  getPendingUsers,
  getUserById,
  approveUser,
  rejectUser,
  deleteUser,
  getListings,
  getListingById,
  deleteListing,
  markListingSold,
  removeListing,
  getStats,
};
