import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { isAnyArrayBuffer } from 'node:util/types';
import { IsFileKind } from 'src/shared/decorators/index.decorators';

export class GptFileDto {
    @IsString()
    @IsOptional()
    readonly prompt?: string;

    @IsOptional()
    @IsFileKind({ kind: 'audio', maxMb: 5 })
    public file: Express.Multer.File;

    // TODO
    @IsOptional()
    @IsFileKind({ kind: 'audio', maxMb: 5 })
    public files: Express.Multer.File[];
}
