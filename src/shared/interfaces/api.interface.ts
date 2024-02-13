import type { ChatCompletionChunk } from 'openai/resources';
import type { Stream } from 'openai/streaming';
import {
    gptAudioFormats,
    gptAudioModel,
    gptModels,
    gptVoices,
    kindFormatFile,

} from '../services/contants.service';

// Kind Api Responses
export type IApi<T> = Promise<{ data: T }>;

export type IApiStream<T = ChatCompletionChunk> = Promise<Stream<T>>;

export type IApiAudio<T = Response> = Promise<T>;

//  Gpt Models type
export type IGptModel = (string & {}) | (typeof gptModels)[number];

export type IGptVoice = (typeof gptVoices)[number];

export type IGptAudioModel = (typeof gptAudioModel)[number];

export type IGptAudioFormat = (typeof gptAudioFormats)[number];

// Other types

export type IKindFormatFile = typeof kindFormatFile[number];
