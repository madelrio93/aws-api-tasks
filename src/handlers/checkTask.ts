import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { checkTask } from '../services/taskService';
import { handleErrors } from '../utils/handleErrors';
import { successResponse } from '../utils/response';
import { ERRORS } from '../utils/constants';

export const checkTaskHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.pathParameters) throw new Error(ERRORS.MISSING_TASK_ID);
        if (!event.body) throw new Error(ERRORS.MISSING_BODY);

        const { id } = event.pathParameters || {};

        const body = JSON.parse(event.body);
        const data = await checkTask(id, body.check);

        return successResponse(200, { data });
    } catch (err: any) {
        return handleErrors(err.message);
    }
};