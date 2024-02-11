import OpenAI from 'openai';
import { TranslateDto } from '../dtos/index.dtos';

export const postTranslateUseCase = async (
    openAi: OpenAI,
    dto: TranslateDto,
) => {
    const { prompt, model, maxTokens, temperature, n, lang } = dto;
    const response = await openAi.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `
                Ejemplo de respuesta que debes de dar al usuario:
                {
                    "content": string, // Texto traducido en Markdown
                    "origin_lang": string, // Lenguaje de origen del texto del usuario, en español
                    "result_lang": string // Lenguaje resultante de la traduccion, en español
                }
                Identifica el idioma del texto que el usuario ha proveido.
                Traduce el texto proveido por el usuario desde el idioma en el que este el texto, a este otro idioma: '${lang}'.
                La traducción debe estar en formato Markdown.
                El h2 debe ser el lenguaje del texto de origen y el lenguaje de texto traducido en el siguiente formato: 'Se va a traducir de {lenguajeOrigen} a {lenguajeResultante}, y debe estar escritoen español.
                `,
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
    const { content } = response.choices[0].message;
    return {
        data: JSON.parse(content),
    };
};
