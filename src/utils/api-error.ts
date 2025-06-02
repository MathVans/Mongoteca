export enum ErrorCode {
    BAD_REQUEST = "BAD_REQUEST",
    UNAUTHORIZED = "UNAUTHORIZED",
    NOT_FOUND = "NOT_FOUND",
    CONFLICT = "CONFLICT",
    VALIDATION = "VALIDATION",
    INTERNAL = "INTERNAL",
}

export class ApiError extends Error {
    code: ErrorCode;
    status: number;
    details?: unknown;

    constructor(
        message: string,
        code: ErrorCode,
        status: number,
        details?: unknown,
    ) {
        super(message);
        this.name = "ApiError";
        this.code = code;
        this.status = status;
        this.details = details;
    }

    // Helper methods to create common error types
    static badRequest(message: string, details?: unknown): ApiError {
        return new ApiError(message, ErrorCode.BAD_REQUEST, 400, details);
    }

    static unauthorized(message: string): ApiError {
        return new ApiError(message, ErrorCode.UNAUTHORIZED, 401);
    }

    static forbidden(message: string): ApiError {
        return new ApiError(message, ErrorCode.UNAUTHORIZED, 403);
    }

    static notFound(message: string): ApiError {
        return new ApiError(message, ErrorCode.NOT_FOUND, 404);
    }

    static conflict(message: string): ApiError {
        return new ApiError(message, ErrorCode.CONFLICT, 409);
    }

    static validation(message: string, details?: unknown): ApiError {
        return new ApiError(message, ErrorCode.VALIDATION, 422, details);
    }

    static internal(message: string = "Internal server error"): ApiError {
        return new ApiError(message, ErrorCode.INTERNAL, 500);
    }
}
