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
    UseInterceptors,
} from '@nestjs/common';
import { GptService } from './gpt.service';
import type { Response, Request } from 'express';
import {
    AudioToTextDto,
    OrthographyDto,
    ProConDicusserDto,
    TextToVoiceDto,
    TranslateDto,
} from './dtos/index.dtos';
// Needed to use declarative types
import { Multer } from 'multer';
import { FileToBodyInterceptor } from 'src/shared/interceptors/index.interceptors';

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
        @Req() req: Request,
    ) {
        const { file_path: filePath } = (
            await this._gptService.postTextToVoice(body, { req })
        ).data;
        res.setHeader('Content-Type', `audio/${body.format}`);
        res.status(HttpStatus.OK);
        res.sendFile(filePath);
    }

    @Post('text-to-voice/stream')
    async postTextToVoiceReturnAudioStream(
        @Body() body: TextToVoiceDto,
        @Res() res: Response,
        @Req() req: Request,
    ) {
        const { stream: audio, file_path: filePath } = (
            await this._gptService.postTextToVoice(body, { stream: true, req })
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

    @Post('audio-to-text')
    @UseInterceptors(FileToBodyInterceptor('file'))
    async postAudioToText(@Body() body: AudioToTextDto) {
        // console.log({ body });
        // this._gptService.postAudioToText(body);
        return 'done';
    }
}
