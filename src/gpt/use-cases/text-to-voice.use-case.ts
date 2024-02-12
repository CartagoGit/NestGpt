import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import * as shortUuid from 'short-uuid';
import type OpenAI from 'openai';
import { TextToVoiceDto } from '../dtos/text-to-voice.dto';
import {
    IApi,
    ITextToVoiceResponse,
} from 'src/shared/interfaces/index.interfaces';

const uuid = shortUuid();

export const postTextToVoiceUseCase = async (
    openAi: OpenAI,
    dto: TextToVoiceDto,
): IApi<ITextToVoiceResponse> => {
    const { voice, prompt, format, model } = dto;

    const folderPath = path.resolve(__dirname, '../../../generated/audios');
    const fileName = `${new Date().getTime().toString().padStart(14, '0')}_${uuid.new().slice(0, 5)}.${format}`;
    const filePath = path.resolve(folderPath, fileName);
    await fs.mkdir(folderPath, { recursive: true });

    const audio = await openAi.audio.speech.create({
        input: prompt,
        model,
        voice,
        response_format: format,
    });
    const buffer = Buffer.from(await audio.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    return {
        data: {
            file_name: fileName,
            file_path: filePath,
            folder_path: folderPath,
            format,
        },
    };
};
