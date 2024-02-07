import OpenAI from 'openai';

import { ProConDtoDicusser } from '../dtos/pro-com.dto';

export const postProConStreamUseCase = async (
    openAi: OpenAI,
    options: ProConDtoDicusser,
) => {
    const { prompt, maxTokens, model, n, temperature } = options;
    const completion = await openAi.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
                la respuesta debe de ser en formato markdown,
                los pros y contras deben de estar en una lista`,
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
