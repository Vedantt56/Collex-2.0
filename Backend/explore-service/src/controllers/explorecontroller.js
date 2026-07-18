const exploreService = require(
    "../services/exploreService"
);

const getAllListings = async (req, res) => {
    try {
        const {
            page,
            limit,
            category,
            sort,
        } = req.query;

        const listings =
            await exploreService.getAllListings(
                page,
                limit,
                category,
                sort
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
        const listing =
            await exploreService.getListingById(
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

const searchListings = async (req, res) => {
    try {
        const listings =
            await exploreService.searchListings(
                req.query.q
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

module.exports = {
    getAllListings,
    getListingById,
    searchListings,
};