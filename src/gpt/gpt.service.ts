import { HttpException, Injectable } from '@nestjs/common';
import 'openai/shims/node';
import OpenAI from 'openai';
import { ConstantsService } from 'src/shared/services/contants.service';

import {
    postAudioToTextUseCase,
    postOrthographyCheckUseCase,
    postProConDicusserUseCase,
    postProConStreamUseCase,
    postTextToVoiceUseCase,
    postTranslateUseCase,
} from './use-cases/index.use-cases';
import {
    AudioToTextDto,
    OrthographyDto,
    ProConDicusserDto,
    TextToVoiceDto,
    TranslateDto,
} from './dtos/index.dtos';
import { getPathFile } from 'src/shared/helpers/file.helper';
import type { Request } from 'express';

@Injectable()
export class GptService {
    // ANCHOR : Properties
    private _openAi = new OpenAI({ apiKey: this._constantsSvc.openAiKey });

    // ANCHOR : Constructor
    constructor(private _constantsSvc: ConstantsService) {}

    // ANCHOR Helper Methods

    private async _tryCatch<T extends () => any>(
        fn: T,
    ): Promise<ReturnType<T>> {
        try {
            return await fn();
        } catch (error) {
            if (
                error instanceof SyntaxError &&
                error.message.includes('JSON Parse error')
            ) {
                throw new HttpException(
                    {
                        message: error.message,
                        kind: 'JsonParseError',
                        description:
                            'GptService: Incomplete response from OpenAi. Text too long for maxTokens request.',
                        cause: 'The response from OpenAi is incomplete. Then the JSON.parse method fails.',
                        statusCode: 400,
                    },
                    400,
                );
            }

            console.error('Error calling OpenAi', error);
            throw error;
        }
    }

    // ANCHOR : Methods
    public async postOrthographyCheck(dto: OrthographyDto) {
        return this._tryCatch(() =>
            postOrthographyCheckUseCase({ openAi: this._openAi, dto }),
        );
    }

    public async postProConDicusser(dto: ProConDicusserDto) {
        return this._tryCatch(() =>
            postProConDicusserUseCase({ openAi: this._openAi, dto }),
        );
    }

    public async postProConStream(dto: ProConDicusserDto) {
        return this._tryCatch(() =>
            postProConStreamUseCase({ openAi: this._openAi, dto }),
        );
    }

    public async postTranslate(dto: TranslateDto) {
        return this._tryCatch(() =>
            postTranslateUseCase({ openAi: this._openAi, dto }),
        );
    }

    public async postTextToVoice(
        dto: TextToVoiceDto,
        options: { stream?: boolean; req: Request },
    ) {
        return this._tryCatch(() =>
            postTextToVoiceUseCase({ openAi: this._openAi, dto }, options),
        );
    }

    public async getTextToVoice(props: { fileName: string }) {
        const { fileName } = props;
        return this._tryCatch(() => {
            return { data: { filePath: getPathFile(fileName) } };
        });
    }

    
    public async postAudioToText(dto: AudioToTextDto) {
        return this._tryCatch(() =>
            postAudioToTextUseCase({ openAi: this._openAi, dto }),
        );
    }
}
