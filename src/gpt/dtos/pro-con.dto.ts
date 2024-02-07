import { IsInt, IsOptional, IsString } from 'class-validator';

export class ProConDicusserDto {
    @IsString()
    readonly prompt: string;

    @IsInt()
    @IsOptional()
    readonly maxTokens?: number;
}
