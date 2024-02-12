import { ChatCompletionChunk } from 'openai/resources';
import {
    gptAudioFormats,
    gptAudioModel,
    gptModels,
    gptVoices,
} from '../services/contants.service';
import { Stream } from 'openai/streaming';

// Kind Api Responses
export type IApi<T> = Promise<{ data: T }>;

export type IApiStream<T = ChatCompletionChunk> = Promise<Stream<T>>;

export type IApiAudio<T = Response> = Promise<T>;

//  Gpt Models type
export type IGptModel = (string & {}) | (typeof gptModels)[number];

export type IGptVoice = (typeof gptVoices)[number];

export type IGptAudioModel = (typeof gptAudioModel)[number];

export type IGptAudioFormat = (typeof gptAudioFormats)[number];
