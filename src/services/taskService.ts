import {
    ScanCommand,
    PutCommand,
    DeleteCommand,
    UpdateCommand,
    UpdateCommandOutput,
    DeleteCommandOutput,
    PutCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../lib/db';
import { Task } from '../models/Task';
import { randomUUID } from 'crypto';
import { ERRORS } from '../utils/constants';

export const getAllTasks = async (): Promise<Task[]> => {
    const data = await ddbDocClient.send(
        new ScanCommand({
            TableName: process.env.TASKS_TABLE,
        }),
    );

    return data.Items as Task[];
};

export const createTask = async (data: Task): Promise<Task> => {
    const task = {
        id: randomUUID(),
        ...data,
    };

    const res: PutCommandOutput = await ddbDocClient.send(
        new PutCommand({
            TableName: process.env.TASKS_TABLE,
            Item: task,
        }),
    );

    if (!res) throw new Error(ERRORS.CREATE_TASK_ERROR);

    return task as Task;
};

export const deleteTask = async (id: Task['id']): Promise<{ id: Task['id'] }> => {
    const res: DeleteCommandOutput = await ddbDocClient.send(
        new DeleteCommand({
            TableName: process.env.TASKS_TABLE,
            Key: {
                id,
            },
        }),
    );

    if (!res) throw new Error(ERRORS.DELETE_TASK_ERROR);
    return {
        id,
    };
};

export const checkTask = async (id: Task['id'], value: boolean) => {
    const res: UpdateCommandOutput = await ddbDocClient.send(
        new UpdateCommand({
            TableName: process.env.TASKS_TABLE,
            Key: {
                id,
            },
            UpdateExpression: 'set #checkAttr = :value',
            ExpressionAttributeNames: {
                '#checkAttr': 'check',
            },
            ExpressionAttributeValues: {
                ':value': value,
            },
            ReturnValues: 'ALL_NEW',
        }),
    );

    if (!res) throw new Error(ERRORS.CHECK_TASK_ERROR);
    return res.Attributes;
};
