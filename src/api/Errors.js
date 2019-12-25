export default class AuthenticationError extends Error {
    constructor(message, ...rest) {
        super(message, rest);
        this.name = "AuthenticationError";
    }
}