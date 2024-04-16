class ErrorResponse extends Error {
    codeStatus: number;

    constructor(message: string, codeStatus: number) {
        super(message);
        this.codeStatus = codeStatus;
    }
}

export default ErrorResponse;
