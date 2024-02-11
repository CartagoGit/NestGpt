import { IsString } from 'class-validator';
import { GptDto } from './gpt.dto';
import { IGptModel } from 'src/shared/interfaces/api.interface';

export class TranslateDto extends GptDto {
    @IsString()
    lang: string = 'English';

    maxTokens: number = 500;
    model: IGptModel = 'gpt-4';
}
