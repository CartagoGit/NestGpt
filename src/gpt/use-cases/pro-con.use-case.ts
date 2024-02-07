import OpenAI from 'openai';

import { IApi, IOptions } from 'src/shared/interfaces/api.interface';

export const postProConDiscusserUseCase = async (
    openAi: OpenAI,
    options: IOptions,
): IApi<string> => {
    const { prompt, maxTokens } = options;
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
        model: 'gpt-4',
        temperature: 0,
        max_tokens: maxTokens ?? 150,
        n: 1,
    });
    const {
        message: { content },
    } = completion.choices[0];
    return { data: content };
};
