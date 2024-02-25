import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IKindFormatFile } from 'src/shared/interfaces/index.interfaces';

export class GptFileDto {
    @IsString()
    @IsOptional()
    readonly prompt?: string;

    @IsString()
    readonly kind: IKindFormatFile = 'audio';

    @IsNumber()
    readonly maxMb: number = 5;

    readonly file: Express.Multer.File;
}
