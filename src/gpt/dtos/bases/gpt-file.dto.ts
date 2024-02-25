import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { isAnyArrayBuffer } from 'node:util/types';
import { IsFileKind } from 'src/shared/decorators/index.decorators';

export class GptFileDto {
    @IsString()
    @IsOptional()
    readonly prompt?: string;

    // @UploadedFileKind({ kind: 'audio', maxMb: 10 })
    // private _file: Express.Multer.File;
    // @IsNotEmpty()
    @IsFileKind({ kind: 'audio', maxMb: 5 })
    public file: Express.Multer.File;
    // get file(): Express.Multer.File {
    //     return this._file;
    // }

    // public setFile(file: Express.Multer.File): void {
    //     this._file = file;
    // }
}
