import { HttpException, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConstantsService } from 'src/shared/services/contants.service';

import {
    postOrthographyCheckUseCase,
    postProConDicusserUseCase,
    postProConStreamUseCase,
    postTranslateUseCase,
} from './use-cases/index.use-cases';
import { GptDto, ProConDicusserDto, TranslateDto } from './dtos/index.dtos';

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
    public async postOrthographyCheck(dto: GptDto) {
        return this._tryCatch(() =>
            postOrthographyCheckUseCase(this._openAi, dto),
        );
    }

    public async postProConDicusser(dto: ProConDicusserDto) {
        return this._tryCatch(() =>
            postProConDicusserUseCase(this._openAi, dto),
        );
    }

    public async postProConStream(dto: ProConDicusserDto) {
        return this._tryCatch(() => postProConStreamUseCase(this._openAi, dto));
    }

    public async postTranslate(dto: TranslateDto) {
        return this._tryCatch(() => postTranslateUseCase(this._openAi, dto));
    }
}
