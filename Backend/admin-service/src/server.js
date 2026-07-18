require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5004;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Admin service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start admin service", error);
  }
};

startServer();
