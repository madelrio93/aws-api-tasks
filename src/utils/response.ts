import { APIGatewayProxyResult } from 'aws-lambda';

const headers = {
    'Content-Type': 'application/json',
};

export const successResponse = (statusCode: number, body: any): APIGatewayProxyResult => ({
    statusCode,
    body: JSON.stringify(body),
    headers,
});

export const errorResponse = (statusCode: number, message: string): APIGatewayProxyResult => ({
    statusCode,
    body: JSON.stringify({ message }),
    headers,
});
