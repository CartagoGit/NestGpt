import { IsIn, IsOptional, IsString } from 'class-validator';
import {
    IGptAudioFormat,
    IGptAudioModel,
    IGptVoice,
} from 'src/shared/interfaces/index.interfaces';

import {
    gptVoices,
    gptAudioFormats,
    gptAudioModel,
} from 'src/shared/services/contants.service';

export class GptDtoAudio {
    @IsString()
    readonly prompt: string;

    @IsString()
    @IsOptional()
    @IsIn(gptVoices)
    public voice: IGptVoice = 'onyx';

    @IsString()
    @IsOptional()
    @IsIn(gptAudioFormats)
    public format: IGptAudioFormat = 'mp3';

    @IsString()
    @IsOptional()
    @IsIn(gptAudioModel)
    public model: IGptAudioModel = 'tts-1';
}
