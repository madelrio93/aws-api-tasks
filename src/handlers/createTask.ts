import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { randomUUID } from 'crypto';
import { createTask } from '../services/taskService';
import { errorResponse, successResponse } from '../utils/response';
import { ERRORS, STATUS_CODES } from '../utils/constants';
import { handleErrors } from '../utils/handleErrors';

export const createTaskHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) throw new Error(ERRORS.MISSING_BODY);
        const body = JSON.parse(event.body);
        const data = await createTask(body);

        return successResponse(STATUS_CODES.CREATED, { data });
    } catch (err) {
        return handleErrors(err)
    }
};
