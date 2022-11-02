export function filePath (path) {
    return function corsMiddleware(req, res, next) {
        req.filePath = path
        next();
    }
}