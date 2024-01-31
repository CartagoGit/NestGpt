import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';
import { SharedModule } from 'src/shared/services/shared.module';

@Module({
  controllers: [GptController],
  providers: [GptService],
  imports: [SharedModule]
})
export class GptModule {}
