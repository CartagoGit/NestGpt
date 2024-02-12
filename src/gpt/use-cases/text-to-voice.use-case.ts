import path from 'node:path';
import fs from 'node:fs';
import shortUuid from 'short-uuid';
import OpenAI from 'openai';
import { TextToVoiceDto } from '../dtos/text-to-voice.dto';
import { IApiAudio } from 'src/shared/interfaces/index.interfaces';

const uuid = shortUuid();

export const postTextToVoiceUseCase = async (
    openAi: OpenAI,
    dto: TextToVoiceDto,
): IApiAudio => {
    const { voice, prompt, format, model } = dto;

    const folderPath = path.resolve(__dirname, '../../../generated/audios');
    const filePath = path.resolve(
        folderPath,
        `${new Date().getTime().toString().padStart(14, '0')}_${uuid.new()}.${format}`,
    );

    const completion = await openAi.audio.speech.create({
        input: prompt,
        model,
        voice,
        response_format: format,
    });
    return completion;
};
