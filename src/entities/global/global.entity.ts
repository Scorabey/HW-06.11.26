export class UnexpectedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UnexpectedError";
    }
}

export class NotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundException";
    }
}