const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./src/config/db");

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
    console.log(
        `Explore Service running on port ${PORT}`
    );
});