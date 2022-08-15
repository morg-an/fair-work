class AppError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}

module.exports = AppError;

// to use - review video #438 - custom error class