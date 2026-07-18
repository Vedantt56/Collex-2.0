const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Books",
                "Electronics",
                "Furniture",
                "Stationery",
                "Others",
            ],
        },

        condition: {
            type: String,
            required: true,
            enum: ["New", "Like New", "Good", "Fair"],
        },

        images: {
            type: [String],
            default: [],
        },

        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        sellerName: {
            type: String,
            required: true,
        },

        college: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["available", "sold", "hidden"],
            default: "available",
        },

        views: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Listing", listingSchema);