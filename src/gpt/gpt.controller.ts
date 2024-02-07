import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProConDicusserDto } from './dtos/index.dtos';

@Controller('gpt')
export class GptController {
    constructor(private readonly _gptService: GptService) {}

    @Post('orthography/check')
    postOrthographyCheck(@Body() body: OrthographyDto) {
        return this._gptService.postOrthographyCheck(body);
    }

    @Post('pro-con/discusser')
    postProConDiscusser(@Body() body: ProConDicusserDto) {
        return this._gptService.postProConDiscusser(body);
    }
}
