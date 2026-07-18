const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));


app.use("/api/v1/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("Auth Service Running 🚀");
});

module.exports = app;
