const adminService = require("../services/adminService");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const getUsers = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    res.status(200).json(new ApiResponse(true, "Users fetched successfully", users));
  } catch (error) {
    const apiError = new ApiError(500, error.message);
    res.status(apiError.statusCode).json({ success: false, message: apiError.message });
  }
};

const getPendingUsers = async (req, res) => {
  try {
    const users = await adminService.getPendingUsers();
    res.status(200).json(new ApiResponse(true, "Pending users fetched successfully", users));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await adminService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json(new ApiResponse(true, "User fetched successfully", user));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const approveUser = async (req, res) => {
  try {
    const user = await adminService.approveUser(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json(new ApiResponse(true, "User approved successfully", user));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const rejectUser = async (req, res) => {
  try {
    const user = await adminService.rejectUser(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json(new ApiResponse(true, "User rejected successfully", user));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await adminService.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json(new ApiResponse(true, "User deleted successfully"));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getListings = async (req, res) => {
  try {
    const listings = await adminService.getListings(req.headers.authorization);
    res.status(200).json(new ApiResponse(true, "Listings fetched successfully", listings));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await adminService.getListingById(req.params.id, req.headers.authorization);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }
    res.status(200).json(new ApiResponse(true, "Listing fetched successfully", listing));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const deleted = await adminService.deleteListing(req.params.id, req.headers.authorization);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }
    res.status(200).json(new ApiResponse(true, "Listing deleted successfully"));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const markListingSold = async (req, res) => {
  try {
    const listing = await adminService.markListingSold(req.params.id, req.headers.authorization);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }
    res.status(200).json(new ApiResponse(true, "Listing marked as sold", listing));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeListing = async (req, res) => {
  try {
    const listing = await adminService.removeListing(req.params.id, req.headers.authorization);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }
    res.status(200).json(new ApiResponse(true, "Listing removed", listing));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const stats = await adminService.getStats(req.headers.authorization);
    res.status(200).json(new ApiResponse(true, "Stats fetched successfully", stats));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
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
