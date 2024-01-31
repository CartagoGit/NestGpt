interface IOptions {
    prompt: string;
}

export const postOrthographyCheckUseCase = async (options: IOptions) => {
    const { prompt } = options;
    return { prompt, apiKey: process.env.OPENAI_API_KEY };
};
