import { PingModule } from './_ping/ping.module';
import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [PingModule, GptModule, ConfigModule.forRoot()],
    controllers: [],
    providers: [],
})
export class AppModule {}
