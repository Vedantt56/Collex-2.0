const express = require("express");

const router = express.Router();

const { signup } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");
const { getMe } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { logout } = require("../controllers/authController");
router.post("/signup", signup);

router.post("/login", loginUser);

router.get("/me", authMiddleware, getMe);
router.post("/logout", authMiddleware, logout);
module.exports = router;
