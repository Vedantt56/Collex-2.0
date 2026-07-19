const AUTH_SERVICE_URL =
    process.env.AUTH_SERVICE_URL ||
    "http://auth-service:5000/api/v1/auth";

const getCurrentUser = async (authorization) => {
    const response = await fetch(`${AUTH_SERVICE_URL}/me`, {
        headers: {
            Authorization: authorization,
        },
    });

    if (!response.ok) {
        throw new Error("Auth service rejected the token");
    }

    const data = await response.json();

    return data.user;
};

module.exports = {
    getCurrentUser,
};
