const listingService = require("../services/listingService");

const createListing = async (req, res) => {
    try {
        console.log("CONTROLLER:", req.user);
        const listing = await listingService.createListing(
            req.body,
            req.user
        );

        res.status(201).json({
            success: true,
            message: "Listing created successfully.",
            data: listing,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyListings = async (req, res) => {
    try {
        const listings = await listingService.getMyListings(
            req.user._id
        );

        res.status(200).json({
            success: true,
            count: listings.length,
            data: listings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getListingById = async (req, res) => {
    try {
        const listing = await listingService.getListingById(
            req.params.id
        );

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found.",
            });
        }

        res.status(200).json({
            success: true,
            data: listing,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateListing = async (req, res) => {
    try {
        const listing = await listingService.getListingById(
            req.params.id
        );

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found.",
            });
        }

        if (
            listing.sellerId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to update this listing.",
            });
        }

        const updatedListing =
            await listingService.updateListing(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Listing updated successfully.",
            data: updatedListing,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteListing = async (req, res) => {
    try {
        const listing = await listingService.getListingById(
            req.params.id
        );

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found.",
            });
        }

        if (
            listing.sellerId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to delete this listing.",
            });
        }

        await listingService.deleteListing(req.params.id);

        res.status(200).json({
            success: true,
            message: "Listing deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const adminGetListings = async (req, res) => {
    try {
        const listings = await listingService.getAllListings();
        res.status(200).json({
            success: true,
            data: listings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const adminGetStats = async (req, res) => {
    try {
        const [totalListings, activeListings] = await Promise.all([
            listingService.countListings(),
            listingService.countListings({ status: "available" }),
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalListings,
                activeListings,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const adminDeleteListing = async (req, res) => {
    try {
        const deleted = await listingService.deleteListing(req.params.id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Listing not found.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Listing deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const adminMarkListingSold = async (req, res) => {
    try {
        const updated = await listingService.updateListing(req.params.id, {
            status: "sold",
        });
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Listing not found.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Listing marked as sold.",
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const adminRemoveListing = async (req, res) => {
    try {
        const updated = await listingService.updateListing(req.params.id, {
            status: "hidden",
        });
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Listing not found.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Listing hidden successfully.",
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
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
};