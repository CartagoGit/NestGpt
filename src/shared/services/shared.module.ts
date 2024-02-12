/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConstantsService } from './contants.service';

@Module({
    imports: [],
    controllers: [],
    providers: [ConstantsService],
    exports: [ConstantsService],
})
export class SharedModule {}
