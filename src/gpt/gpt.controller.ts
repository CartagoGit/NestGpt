import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GptDto } from './dtos/gpt.dto';
import { ProConDtoDicusser } from './dtos/pro-com.dto';

@Controller('gpt')
export class GptController {
    constructor(private readonly _gptService: GptService) {}

    @Post('orthography/check')
    postOrthographyCheck(@Body() body: GptDto) {
        return this._gptService.postOrthographyCheck(body);
    }

    @Post('pro-con/dicusser')
    postProConDicusser(@Body() body: ProConDtoDicusser) {
        return this._gptService.postProConDicusser(body);
    }
}
