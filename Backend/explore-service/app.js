const express = require("express");
const cors = require("cors");
const exploreRoutes = require("./src/routes/exploreRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", exploreRoutes);

module.exports = app;
