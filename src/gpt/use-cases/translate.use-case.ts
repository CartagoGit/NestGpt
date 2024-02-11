import OpenAI from 'openai';
import { TranslateDto } from '../dtos/index.dtos';

export const postTranslateUseCase = async (
    openAi: OpenAI,
    dto: TranslateDto,
) => {
    const { prompt, model, maxTokens, temperature, n, lang } = dto;
    console.log(dto);
    const response = await openAi.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `Traduce el siguiente texto al idioma '${lang}':${prompt}`,
            }
            // ,{
            //     role: 'user',
            //     content: prompt,
            // }
        ],
        model,
        max_tokens: maxTokens,
        temperature,
        n,
    });
    console.log(response);
};
