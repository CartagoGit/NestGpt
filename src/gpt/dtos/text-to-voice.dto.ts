import { IsString } from 'class-validator';
import { GptDto } from './index.dtos';

export class TextToVoiceDto extends GptDto {
    @IsString()
    public voice: string;
}
