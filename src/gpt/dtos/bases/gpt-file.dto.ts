import { IsOptional, IsString } from "class-validator";

export class GptFileDto {
    @IsString()
    @IsOptional()
    readonly prompt?: string;

    readonly file: Express.Multer.File;
}
