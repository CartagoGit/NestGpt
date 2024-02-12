/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PingService } from './ping.service';
import { PingController } from './ping.controller';

@Module({
  imports: [],
  controllers: [PingController],
  providers: [PingService],
})
export class PingModule {}
