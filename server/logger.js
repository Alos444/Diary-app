

const logger = (req, res, next) => {
    console.log(req.originalUrl, req.method);
    next();
};

module.exports = logger;


