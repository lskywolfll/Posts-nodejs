

function Success(res, message, status = 200) {
    res.status(status).json({
        error: false,
        status,
        body: message
    })
}

function Error(res, message = "Internal server error", status = 500) {
    res.status(status).json({
        error: true,
        status,
        body: message
    })
}

module.exports = {
    Success,
    Error
}