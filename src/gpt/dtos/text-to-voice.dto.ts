import { IsIn, IsOptional, IsString, isString } from 'class-validator';
import { GptDto } from './index.dtos';
import {
    IGptAudioFormat,
    IGptAudioModel,
    IGptVoice,
} from 'src/shared/interfaces/api.interface';
import {
    gptAudioFormats,
    gptAudioModel,
    gptVoices,
} from 'src/shared/services/contants.service';

export class TextToVoiceDto extends GptDto {
    @IsString()
    @IsOptional()
    @IsIn(gptVoices)
    public voice: IGptVoice = 'nova';

    @IsString()
    @IsOptional()
    @IsIn(gptAudioFormats)
    public format: IGptAudioFormat = 'mp3';

    @IsString()
    @IsOptional()
    @IsIn(gptAudioModel)
    public model: IGptAudioModel = 'tts-1';
}
