import { IsString } from 'class-validator';

export class AudioToTextDto {
    @IsString()
    prompt?: string;

}
