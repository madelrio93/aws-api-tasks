import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { deleteTask } from '../services/taskService';
import { errorResponse, successResponse } from '../utils/response';
import { ERRORS, STATUS_CODES } from '../utils/constants';
import { handleErrors } from '../utils/handleErrors';

export const deleteTaskHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.pathParameters) throw new Error(ERRORS.MISSING_TASK_ID);
        const { id } = event.pathParameters || {};

        const res = await deleteTask(id);

        return successResponse(STATUS_CODES.OK, { data: res });
    } catch (err) {
        return handleErrors(err);
    }
};
