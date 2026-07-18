const express = require("express");
const {
    getAllListings,
    getListingById,
    searchListings,
} = require("../controllers/explorecontroller");

const router = express.Router();

router.get("/explore", getAllListings);

router.get("/explore/:id", getListingById);

router.get("/search", searchListings);

module.exports = router;
