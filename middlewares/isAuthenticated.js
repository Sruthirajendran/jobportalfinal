import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;
        
        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Verify token
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid token",
                    success: false
                });
            }
            // Attach user ID to request object
            req.id = decode.userId;
            next();
        });
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export default isAuthenticated;
