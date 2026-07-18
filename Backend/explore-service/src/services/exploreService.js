const Listing = require("../models/listing");

const getAllListings = async (
    page = 1,
    limit = 10,
    category,
    sort
) => {
    let query = {};

    if (category) {
        query.category = category;
    }

    let listings = Listing.find(query);

    if (sort === "price") {
        listings = listings.sort({ price: 1 });
    }

    return await listings
        .skip((page - 1) * limit)
        .limit(limit);
};

const getListingById = async (id) => {
    return await Listing.findById(id);
};

const searchListings = async (query) => {
    return await Listing.find({
        title: {
            $regex: query,
            $options: "i",
        },
    });
};

module.exports = {
    getAllListings,
    getListingById,
    searchListings,
};
