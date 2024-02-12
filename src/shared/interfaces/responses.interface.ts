export interface IOrthographyCheckResponse {
    content: string;
    accuracy: number;
    message: string;
    errors: string[]; // ['error' -> solución]
}
