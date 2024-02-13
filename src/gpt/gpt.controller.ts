import * as fs from 'node:fs';
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { GptService } from './gpt.service';
import type { Response, Request } from 'express';
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

    @Post('text-to-voice/data')
    async postTextToVoiceReturnData(
        @Body() body: TextToVoiceDto,
        @Req() req: Request,
    ) {
        const { data } = await this._gptService.postTextToVoice(body, { req });
        return { data };
    }

    @Post('text-to-voice')
    async postTextToVoiceReturnAudio(
        @Body() body: TextToVoiceDto,
        @Res() res: Response,
    ) {
        const { file_path: filePath } = (
            await this._gptService.postTextToVoice(body)
        ).data;
        res.setHeader('Content-Type', `audio/${body.format}`);
        res.status(HttpStatus.OK);
        res.sendFile(filePath);
    }

    @Post('text-to-voice/stream')
    async postTextToVoiceReturnAudioStream(
        @Body() body: TextToVoiceDto,
        @Res() res: Response,
    ) {
        const { stream: audio, file_path: filePath } = (
            await this._gptService.postTextToVoice(body, { stream: true })
        ).data;
        const writableFile = fs.createWriteStream(filePath);
        res.setHeader('Content-Type', `audio/${body.format}`);
        res.status(HttpStatus.OK);
        for await (const chunk of audio) {
            writableFile.write(chunk);
            res.write(chunk);
        }
        writableFile.end();
        res.end();
    }

    @Get('text-to-voice/:file')
    async getTextToVoice(
        @Param('file') fileName: string,
        @Res() res: Response,
    ) {
        const { filePath } = (
            await this._gptService.getTextToVoice({
                fileName,
            })
        ).data;
        if (!fs.existsSync(filePath))
            throw new NotFoundException('File not found.');
        const format = filePath.split('.').at(-1);
        const readedFile = await fs.promises.readFile(filePath);
        res.writeHead(200, {
            'Content-Type': `audio/${format}`,
            'Content-Disposition': `inline; filename=${fileName}`,
        });
        res.write(readedFile);
        res.end();
    }
}
