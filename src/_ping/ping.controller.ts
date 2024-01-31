import { Controller, Get } from '@nestjs/common';
import { PingService } from './ping.service';

@Controller('')
export class PingController {
    constructor(private readonly _pingSvc: PingService) {}

    @Get(['', 'ping'])
    getTest(): string {
        return this._pingSvc.getPing();
    }
}
