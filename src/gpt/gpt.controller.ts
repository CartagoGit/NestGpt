import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { Response } from 'express';
import {
    OrthographyDto,
    ProConDicusserDto,
    TextToVoiceDto,
    TranslateDto,
} from './dtos/index.dtos';

@Controller('gpt')
export class GptController {
    constructor(private readonly _gptService: GptService) {}

    @Post('orthography/check')
    postOrthographyCheck(@Body() body: OrthographyDto) {
        return this._gptService.postOrthographyCheck(body);
    }

    @Post('pro-con/dicusser')
    postProConDicusser(@Body() body: ProConDicusserDto) {
        return this._gptService.postProConDicusser(body);
    }

    @Post('pro-con/stream')
    async postProConStream(
        @Body() body: ProConDicusserDto,
        @Res() res: Response,
    ) {
        const stream = await this._gptService.postProConStream(body);
        res.setHeader('Content-Type', 'application/json');
        res.status(HttpStatus.OK);
        for await (const chunk of stream) {
            const piece = chunk.choices?.[0].delta.content ?? '';
            // console.info(piece);
            res.write(piece);
        }
        res.end();
    }

    @Post('translate')
    postTranslate(@Body() body: TranslateDto) {
        return this._gptService.postTranslate(body);
    }
    @Post('text-to-voice')
    postTextToVoice(@Body() body: TextToVoiceDto) {
        return this._gptService.postTextToVoice(body);
    }
}
