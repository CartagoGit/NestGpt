import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller()
export class TestController {
  constructor(private readonly _testSvc: TestService) {}

  @Get()
  getTest(): string {
    return this._testSvc.getTest();
  }
}
