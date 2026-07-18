const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const {
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
} = require("../controllers/adminController");

const router = express.Router();

router.get("/users", adminAuth, getUsers);
router.get("/pending-users", adminAuth, getPendingUsers);
router.get("/user/:id", adminAuth, getUserById);
router.put("/approve/:id", adminAuth, approveUser);
router.put("/reject/:id", adminAuth, rejectUser);
router.delete("/user/:id", adminAuth, deleteUser);

router.get("/listings", adminAuth, getListings);
router.get("/listings/:id", adminAuth, getListingById);
router.delete("/listings/:id", adminAuth, deleteListing);
router.put("/listings/:id/sold", adminAuth, markListingSold);
router.put("/listings/:id/remove", adminAuth, removeListing);

router.get("/stats", adminAuth, getStats);

module.exports = router;
