import { Injectable } from '@nestjs/common';
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

    // ANCHOR : Methods
    public async postOrthographyCheck(dto: GptDto) {
        return await postOrthographyCheckUseCase(this._openAi, dto);
    }

    public async postProConDicusser(dto: ProConDicusserDto) {
        return await postProConDicusserUseCase(this._openAi, dto);
    }

    public async postProConStream(dto: ProConDicusserDto) {
        return await postProConStreamUseCase(this._openAi, dto);
    }

    public async postTranslate(dto: TranslateDto) {
        return await postTranslateUseCase(this._openAi, dto);
    }
}
