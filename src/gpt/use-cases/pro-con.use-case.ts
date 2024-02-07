import OpenAI from 'openai';

import { IApi } from 'src/shared/interfaces/api.interface';
import { ProConDtoDicusser } from '../dtos/pro-com.dto';
import { ChatCompletionMessage } from 'openai/resources';

export const postProConDicusserUseCase = async (
    openAi: OpenAI,
    options: ProConDtoDicusser,
): IApi<ChatCompletionMessage> => {
    const { prompt, maxTokens, model, n, temperature } = options;
    console.log({ options });
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
    });
    const { message } = completion.choices[0];
    return { data: message };
};
