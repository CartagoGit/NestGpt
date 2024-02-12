import {
    createDataFile,
    createFile,
    getUrlFile,
} from 'src/shared/helpers/index.helpers';
import { TextToVoiceDto } from '../dtos/text-to-voice.dto';
import type {
    IApi,
    ITextToVoiceResponse,
    IUseCaseProps,
} from 'src/shared/interfaces/index.interfaces';
import type { Request } from 'express';

//* Function implementation
export async function postTextToVoiceUseCase(
    data: IUseCaseProps<TextToVoiceDto>,
    options?: { stream?: boolean; req?: Request },
): IApi<ITextToVoiceResponse> {
    const { openAi, dto } = data;
    const { voice, prompt, format, model } = dto;
    const { stream = false, req } = options || {};
    const audio = await openAi.audio.speech.create({
        input: prompt,
        model,
        voice,
        response_format: format,
    });

    const { fileName, filePath, folderPath } = createDataFile({
        format,
    });

    const endpoint = '/gpt/text-to-voice';
    const getterUrl = getUrlFile({ endpoint, fileName, req });

    const fileData = {
        file_name: fileName,
        file_path: filePath,
        folder_path: folderPath,
        format,
        getter_url: getterUrl,
    } as ITextToVoiceResponse;
    if (stream) {
        return { data: { ...fileData, stream: audio.body } };
    } else {
        await createFile({ file: audio, folderPath, filePath });
        return { data: fileData };
    }
}
