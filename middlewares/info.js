const infoMiddleware = (req, res, next) => {
    let date = new Date();
    console.log(`Time: ${date.toDateString()}
    Request Type: ${req.method}
    Request URL: ${req.originalUrl}`);
    next();
}

export default infoMiddleware;