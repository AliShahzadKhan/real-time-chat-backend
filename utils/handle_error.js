function errorHandler(err, rea, res, next) {
    if(err) {
        res.status(err.statusCode || 500).json({
            error: err.message
        });
    }
}


module.exports = errorHandler;