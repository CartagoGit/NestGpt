import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConstantsService } from 'src/shared/services/contants.service';

import {
    postOrthographyCheckUseCase,
    postProConDicusserUseCase,
} from './use-cases/index.use-cases';
import { GptDto } from './dtos/gpt.dto';
import { ProConDtoDicusser } from './dtos/index.dtos';

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

    public async postProConDicusser(dto: ProConDtoDicusser) {
        return await postProConDicusserUseCase(this._openAi, dto);
    }
}
