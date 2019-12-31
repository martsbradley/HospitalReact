export class AuthenticationError extends Error {
    constructor(message, ...rest) {
        super(message, rest);
        this.name = "AuthenticationError";
    }
}
export class APIError extends Error {
    constructor(status, message,data = [],...rest) {
        super(message, rest);
        this.name = "APIError"
        this.status = status;
        this.data = data;
    }
}
