import { Controller, Get } from '@nestjs/common';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(private readonly _pingSvc: PingService) {}

  @Get()
  getTest(): string {
    return this._pingSvc.getPing();
  }
}
