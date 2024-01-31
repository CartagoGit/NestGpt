import { Injectable } from '@nestjs/common';
import { postOrthographyCheckUseCase } from './use-cases/index.use-cases';
import { OrthographyDto } from './dtos/index.dtos';
import OpenAI from 'openai';
import { ConstantsService } from 'src/shared/services/contants.service';

@Injectable()
export class GptService {
    constructor(private _constantsSvc: ConstantsService) {}
    private _openAi = new OpenAI({ apiKey: this._constantsSvc.openAiKey });
    async postOrthographyCheck({ prompt }: OrthographyDto) {
        return await postOrthographyCheckUseCase(this._openAi, { prompt });
    }
}
