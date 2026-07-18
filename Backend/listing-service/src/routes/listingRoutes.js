const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const isVerifiedSeller = require("../middleware/isVerifiedSeller");
const adminOnly = require("../middleware/adminOnly");
const {
    createListing,
    getMyListings,
    getListingById,
    updateListing,
    deleteListing,
    adminGetListings,
    adminGetStats,
    adminDeleteListing,
    adminMarkListingSold,
    adminRemoveListing,
} = require("../controllers/listingController");

const router = express.Router();

router.post(
    "/listings",
    authMiddleware,
    isVerifiedSeller,
    createListing
);

router.get(
    "/listings/my",
    authMiddleware,
    getMyListings
);

// Admin-specific routes (must be placed before dynamic id routes)
router.get(
    "/listings/admin/all",
    authMiddleware,
    adminOnly,
    adminGetListings
);

router.get(
    "/listings/admin/stats",
    authMiddleware,
    adminOnly,
    adminGetStats
);

router.delete(
    "/listings/admin/:id",
    authMiddleware,
    adminOnly,
    adminDeleteListing
);

router.put(
    "/listings/admin/:id/sold",
    authMiddleware,
    adminOnly,
    adminMarkListingSold
);

router.put(
    "/listings/admin/:id/remove",
    authMiddleware,
    adminOnly,
    adminRemoveListing
);

// Public/Individual routes
router.get(
    "/listings/:id",
    getListingById
);

router.put(
    "/listings/:id",
    authMiddleware,
    updateListing
);

router.delete(
    "/listings/:id",
    authMiddleware,
    deleteListing
);

module.exports = router;