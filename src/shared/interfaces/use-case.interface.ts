import type OpenAI from 'openai';

export interface IUseCaseProps<T> {
    openAi: OpenAI;
    dto: T;
}
