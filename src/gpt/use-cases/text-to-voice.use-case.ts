import OpenAI from 'openai';
import { TextToVoiceDto } from '../dtos/text-to-voice.dto';
import { IApiAudio } from 'src/shared/interfaces/api.interface';

export const postTextToVoiceUseCase = async (
    openAi: OpenAI,
    dto: TextToVoiceDto,
): IApiAudio => {
    const { voice, prompt, format, model } = dto;
    const completion = await openAi.audio.speech.create({
        input: prompt,
        model,
        voice,
        response_format: format,
    });
    return completion;
};
