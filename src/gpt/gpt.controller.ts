import { Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly _gptService: GptService) {}

  @Post('orthography/check')
  postOrthographyCheck() {
    return this._gptService.postOrthographyCheck();
  }
}
