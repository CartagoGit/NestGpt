/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class ConstantsService {
    public openAiKey = process.env.OPENAI_API_KEY;
}
