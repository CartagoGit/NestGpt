import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConstantsService } from 'src/shared/services/contants.service';
import { OrthographyDto, ProConDicusserDto } from './dtos/index.dtos';
import {
    postOrthographyCheckUseCase,
    postProConDiscusserUseCase,
} from './use-cases/index.use-cases';

@Injectable()
export class GptService {
    // ANCHOR : Properties
    private _openAi = new OpenAI({ apiKey: this._constantsSvc.openAiKey });

    // ANCHOR : Constructor
    constructor(private _constantsSvc: ConstantsService) {}

    // ANCHOR : Methods
    public async postOrthographyCheck(dto: OrthographyDto) {
        return await postOrthographyCheckUseCase(this._openAi, dto);
    }

    public async postProConDiscusser(dto: ProConDicusserDto) {
        return await postProConDiscusserUseCase(this._openAi, dto);
    }
}
