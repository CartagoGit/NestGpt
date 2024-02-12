import OpenAI from 'openai';
import { ProConDicusserDto } from '../dtos/index.dtos';
import { IApiStream } from 'src/shared/interfaces/api.interface';
import { ChatCompletionChunk } from 'openai/resources';

export const postProConStreamUseCase = async (
    openAi: OpenAI,
    dto: ProConDicusserDto,
): IApiStream<ChatCompletionChunk> => {
    const { prompt, maxTokens, model, n, temperature } = dto;
    const completion = await openAi.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
                la respuesta debe de ser en formato markdown y debe tener un titulo que sera la pregunta del usuario.
                los pros y contras deben de estar en una lista.
                Ten en cuenta que tienes ${maxTokens - 100} como máximo tokens para realizar tu respuesta, incluyendo este prompt, así que no dejes una respuesta a medias. Termina la respuesta antes de que se acaben los tokens. Quiero una respuesta escueta, no me des una respuesta larga.`,
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
        model,
        max_tokens: maxTokens,
        temperature,
        n,
        stream: true,
    });
    return completion;
};
