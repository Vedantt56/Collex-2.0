const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/admin", adminRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Admin Service Running 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Admin service healthy" });
});

module.exports = app;
