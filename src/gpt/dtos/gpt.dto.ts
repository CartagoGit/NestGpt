import { Transform, Type } from 'class-transformer';
import {
    IsDecimal,
    IsIn,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
import { IGptModel } from 'src/shared/interfaces/api.interface';
import { gptModels } from 'src/shared/services/contants.service';

export class GptDto {
    @IsString()
    readonly prompt: string;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(2000)
    @Type(() => Number)
    readonly maxTokens: number = 150;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 1 })
    @Max(2)
    @Min(0)
    @Type(() => Number)
    readonly temperature: number = 0.2;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    readonly n: number = 1;

    @IsString()
    @IsOptional()
    @IsIn(gptModels)
    readonly model: IGptModel = 'gpt-4';
}
