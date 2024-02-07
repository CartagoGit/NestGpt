export type IApi<T> = Promise<{
    data: T;
}>;

export interface IOptions {
    prompt: string;
    maxTokens?: number;
}

export interface IOrthographyCheckResponse {
    result: string;
    accuracy: number;
    message: string;
    errors: string[]; // ['error' -> solución]
}
