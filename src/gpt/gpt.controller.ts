import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GptDto } from './dtos/gpt.dto';

@Controller('gpt')
export class GptController {
    constructor(private readonly _gptService: GptService) {}

    @Post('orthography/check')
    postOrthographyCheck(@Body() body: GptDto) {
        return this._gptService.postOrthographyCheck(body);
    }

    @Post('pro-con/discusser')
    postProConDiscusser(@Body() body: GptDto) {
        return this._gptService.postProConDiscusser(body);
    }
}
