import { PingModule } from './_ping/ping.module';
import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [PingModule, GptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
