import { IsString } from 'class-validator';

export class AudioToTextDto {
    @IsString()
    prompt?: string;

    file: Express.Multer.File;
}
