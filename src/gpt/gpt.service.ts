import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConstantsService } from 'src/shared/services/contants.service';

import {
    postOrthographyCheckUseCase,
    postProConDiscusserUseCase,
} from './use-cases/index.use-cases';
import { GptDto } from './dtos/gpt.dto';

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

    public async postProConDiscusser(dto: GptDto) {
        return await postProConDiscusserUseCase(this._openAi, dto);
    }
}
