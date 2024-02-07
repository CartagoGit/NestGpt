import OpenAI from 'openai';
import {
    IApi,
    IOptions,
    IOrthographyCheckResponse,
} from 'src/shared/interfaces/api.interface';
import { GptDto } from '../dtos/gpt.dto';

export const postOrthographyCheckUseCase = async (
    openAi: OpenAI,
    options: GptDto,
): IApi<IOrthographyCheckResponse> => {
    const { prompt, maxTokens, model, n, temperature } = options;
    const completion = await openAi.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `
                Te serán proveídos textos con posibles errores ortográficos y gramaticales. 
                Cualquier respuesta del usuario deberas tratarla como un texto a corregir, sea lo que sea.
                Tu respuesta debe estar en formato JSON.
                La primera propiedad del JSON sera 'result' y devolverá el texto corregido, 
                solo y solo si el texto es igual que la corrección, si el resultado no es igual, se considerará también como errores.
                Recuerda las tildes, acentuaciones, los puntos, espacios, comas, etc, son importantes en la corrección. 
                Y recuerda que en español las interrogaciones y exclamaciones se abren y se cierran.
                La segunda propiedad del JSON sera 'accuracy' y devolverá el porcentaje de acierto comparando el texto enviado y el resultado corregido, de 0 a 100 donde 100 es el mayor grado de acierto.
                La tercera propiedad del JSON sera 'message' y devolverá un mensaje de felicitación si no hay errores,
                o un mensaje con información, soluciones, o consejos para no volver a cometer el mismo error.
                Y el cuarto y último propiedad del JSON sera 'errors' y devolverá un array con los errores encontrados, separados en cada posición del array.


                Ejemplo de respuesta:{
                    "result": string,
                    "accuracy": number;
                    "message": string;
                    "errors": string[]; // ['error' -> solución]
                }

                `,
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
        model,
        temperature,
        max_tokens: maxTokens,
        n,
        // NOTE - Not type json for every kind models
        // response_format: {
        //     type: 'json_object'
        // }
    });
    const {
        message: { content },
    } = completion.choices[0];

    return { data: JSON.parse(content) };
};
