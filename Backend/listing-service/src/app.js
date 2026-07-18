const express = require("express");
const cors = require("cors");
const listingRoutes = require("./routes/listingRoutes");

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));

app.use(
    express.urlencoded({
        extended: true,
        limit: "10mb",
    })
);

app.use("/api/v1", listingRoutes);

module.exports = app;