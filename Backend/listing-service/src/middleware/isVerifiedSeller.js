const isVerifiedSeller = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.verificationStatus !== "approved") {
            return res.status(403).json({
                success: false,
                message:
                    "Please verify your college ID before creating listings.",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = isVerifiedSeller;
