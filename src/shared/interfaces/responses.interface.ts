import { IGptAudioFormat } from './api.interface';

export interface IOrthographyCheckResponse {
    content: string;
    accuracy: number;
    message: string;
    errors: string[]; // ['error' -> solución]
}

export interface ITextToVoiceResponse {
    file_path: string;
    folder_path: string;
    format: IGptAudioFormat;
    file_name: string;
    stream?: NodeJS.ReadableStream;
}
