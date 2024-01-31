import OpenAI from 'openai';

interface IOptions {
    prompt: string;
}

export const postOrthographyCheckUseCase = async (
    openAi: OpenAI,
    options: IOptions,
) => {
    const completion = await openAi.chat.completions.create({
        messages: [{ role: 'system', content: 'Dile guapa a olga de la forma mas bonita' }],
        model: 'gpt-3.5-turbo',
    });
    console.log(completion);
    console.log(completion.choices[0]);

    const { prompt } = options;
    return { prompt, apiKey: process.env.OPENAI_API_KEY };
};
