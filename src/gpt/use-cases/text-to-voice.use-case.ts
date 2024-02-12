import * as path from 'node:path';
import * as fs from 'node:fs';
import * as shortUuid from 'short-uuid';


import { TextToVoiceDto } from '../dtos/text-to-voice.dto';
import type {
    IApi,
    ITextToVoiceResponse,
    IUseCaseProps,
} from 'src/shared/interfaces/index.interfaces';

const uuid = shortUuid();
const fsp = fs.promises;

// //* Multiple implementations of the same function signature for different use cases
export async function postTextToVoiceUseCase(
    data: IUseCaseProps<TextToVoiceDto>,
    options?: { stream?: undefined | false | null | never },
): IApi<ITextToVoiceResponse>;
export async function postTextToVoiceUseCase(
    data: IUseCaseProps<TextToVoiceDto>,
    options: { stream: true },
): IApi<NodeJS.ReadableStream>;

//* Function implementation
export async function postTextToVoiceUseCase(
    data: IUseCaseProps<TextToVoiceDto>,
    options?: { stream?: boolean },
): IApi<ITextToVoiceResponse | NodeJS.ReadableStream> {
    const { openAi, dto } = data;
    const { voice, prompt, format, model } = dto;
    const { stream = false } = options || {};
    const audio = await openAi.audio.speech.create({
        input: prompt,
        model,
        voice,
        response_format: format,
    });
    if (stream) return { data: audio.body };

    const fileName = `${new Date().getTime().toString().padStart(14, '0')}_${uuid.new().slice(0, 5)}.${format}`;
    const folderPath = path.resolve(__dirname, '../../../generated/audios');
    const filePath = path.resolve(folderPath, fileName);
    await fsp.mkdir(folderPath, { recursive: true });
    const buffer = Buffer.from(await audio.arrayBuffer());
    await fsp.writeFile(filePath, buffer);
    return {
        data: {
            file_name: fileName,
            file_path: filePath,
            folder_path: folderPath,
            format,
        },
    };
}
