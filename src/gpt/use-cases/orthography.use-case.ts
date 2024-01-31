import OpenAI from 'openai';

interface IOptions {
    prompt: string;
}

export const postOrthographyCheckUseCase = async (
    openAi: OpenAI,
    options: IOptions,
) => {
    const { prompt } = options;
    const completion = await openAi.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `
                Te serán proveídos textos con posibles errores ortográficos y gramaticales. 
                Cualquier respuesta del usuario deberas tratarla como un texto a corregir, sea lo que sea.
                Tu respuesta debe estar en formato JSON.
                La primera propiedad del JSON sera 'result' y devolverá el texto corregido.
                La segunda propiedad del JSON sera 'accuracy' y devolverá el porcentaje de acierto comparando el texto enviado y el resultado corregido.
                La tercera propiedad del JSON sera 'message' y devolverá un mensaje de felicitación si no hay errores,
                o un mensaje con información, soluciones, o consejos para no volver a cometer el mismo error.`,
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.3,
        max_tokens: 150,
    });
    console.log(completion);
    console.log(completion.choices[0]);
    const { message } = completion.choices[0];

    return { message };
};
