class ErrorResponse extends Error {
    // !TODO Add status codes for HTTP requests (TBD)
    constructor(message: string) {
        super(message);
    }
}

export default ErrorResponse;
