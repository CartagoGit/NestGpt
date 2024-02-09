import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GptDto } from './dtos/gpt.dto';
import { ProConDtoDicusser } from './dtos/pro-com.dto';
import { Response } from 'express';

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

    @Post('pro-con/stream')
    async postProConStream(
        @Body() body: ProConDtoDicusser,
        @Res() res: Response,
    ) {
        const stream = await this._gptService.postProConStream(body);
        res.setHeader('Content-Type', 'application/json');
        res.status(HttpStatus.OK);
        for await (const chunk of stream) {
            const piece = chunk.choices?.[0].delta.content ?? '';
            console.info(piece);
            res.write(piece);
        }
        res.end();
    }
}
