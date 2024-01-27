import { Injectable } from '@nestjs/common';
import { postOrthographyCheckUseCase } from './use-cases/index.use-cases';
import { OrthographyDto } from './dtos/index.dtos';

@Injectable()
export class GptService {
    async postOrthographyCheck({ prompt }: OrthographyDto) {
        return await postOrthographyCheckUseCase({ prompt });
    }
}
