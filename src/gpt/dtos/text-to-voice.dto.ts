import { IsOptional, IsString } from 'class-validator';
import { GptDto } from './index.dtos';

export class TextToVoiceDto extends GptDto {

    @IsString()
    @IsOptional()
    public voice: string;
}
