import { gptModels } from "../services/contants.service";

export type IApi<T> = Promise<{
    data: T;
}>;


export type IGptModel = (string & {}) | (typeof gptModels)[number];

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
