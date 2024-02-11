import { IsString } from 'class-validator';
import { GptDto } from './gpt.dto';

export class TranslateDto extends GptDto {
    @IsString()
    lang: string = 'English';
}
