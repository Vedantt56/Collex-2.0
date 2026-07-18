const Listing = require("../models/Listing");

const createListing = async (listingData, user) => {
    const listing = await Listing.create({
        ...listingData,
        sellerId: user._id,
        sellerName: user.name,
        college: user.college,
    });

    return listing;
};

const getMyListings = async (userId) => {
    return await Listing.find({ sellerId: userId });
};

const getListingById = async (listingId) => {
    return await Listing.findById(listingId);
};

const updateListing = async (listingId, data) => {
    return await Listing.findByIdAndUpdate(
        listingId,
        data,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteListing = async (listingId) => {
    return await Listing.findByIdAndDelete(listingId);
};

const getAllListings = async (query = {}) => {
    return await Listing.find(query).sort({ createdAt: -1 });
};

const countListings = async (query = {}) => {
    return await Listing.countDocuments(query);
};

module.exports = {
    createListing,
    getMyListings,
    getListingById,
    updateListing,
    deleteListing,
    getAllListings,
    countListings,
};