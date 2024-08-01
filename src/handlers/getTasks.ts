import { APIGatewayProxyResult } from 'aws-lambda';
import { getAllTasks } from '../services/taskService';
import { STATUS_CODES } from '../utils/constants';
import { handleErrors } from '../utils/handleErrors';
import { successResponse } from '../utils/response';

export const getTasksHandler = async (): Promise<APIGatewayProxyResult> => {
    try {
        const data = await getAllTasks();

        return successResponse(STATUS_CODES.OK, { data });
    } catch (err) {
        return handleErrors(err);
    }
};
