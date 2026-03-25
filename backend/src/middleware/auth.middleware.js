
export const protectedRoute = async (req, res, next) => {
    if (!req.auth()?.isAuthenticated) {
        res.status(401);
        throw new Error("Unauthorized - you must be logged in");
    }
    next();
}