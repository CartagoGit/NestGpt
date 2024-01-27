import { Injectable } from '@nestjs/common';
import { postOrthographyCheckUseCase } from './use-cases/index.use-cases';

@Injectable()
export class GptService {
  async postOrthographyCheck() {
    return await postOrthographyCheckUseCase();
  }
}
