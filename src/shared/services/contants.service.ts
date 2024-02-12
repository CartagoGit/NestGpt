/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

export const gptModels = [
    'gpt-4-0125-preview',
    'gpt-4-turbo-preview',
    'gpt-4-1106-preview',
    'gpt-4-vision-preview',
    'gpt-4',
    'gpt-4-0314',
    'gpt-4-0613',
    'gpt-4-32k',
    'gpt-4-32k-0314',
    'gpt-4-32k-0613',
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-16k',
    'gpt-3.5-turbo-0301',
    'gpt-3.5-turbo-0613',
    'gpt-3.5-turbo-1106',
    'gpt-3.5-turbo-16k-0613',
] as const;

export const gptVoices = [
    'alloy',
    'echo',
    'fable',
    'onyx',
    'nova',
    'shimmer',
] as const;

export const gptAudioModel = ['tts-1', 'tts-1-hd'] as const;

export const gptAudioFormats = ['mp3', 'opus', 'aac', 'flac'] as const;

@Injectable()
export class ConstantsService {
    public openAiKey = process.env.OPENAI_API_KEY;
    public gptModels = gptModels;
    public gptVoices = gptVoices;
    public gptAudioFormats = gptAudioFormats;
    public gptAudioQuality = gptAudioModel;
}
