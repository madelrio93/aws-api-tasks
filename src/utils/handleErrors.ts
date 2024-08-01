import { APIGatewayProxyResult } from "aws-lambda";
import { ERRORS, STATUS_CODES } from "./constants";
import { errorResponse } from "./response";

export const handleErrors = (err: unknown): APIGatewayProxyResult => {
    if (err instanceof Error) {
        console.error(err);
        return errorResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, err.message);
    }
    console.error('Unknown error:', err);
    return errorResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ERRORS.UNKNOWN_ERROR);
};
