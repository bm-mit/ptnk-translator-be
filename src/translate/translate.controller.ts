import { Controller, Get, Query } from '@nestjs/common';
import { translate } from '@vitalets/google-translate-api';

@Controller('translate')
export class TranslateController {
  @Get()
  async getTranslateResult(
    @Query('text') text: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ): Promise<any> {
    return await translate(text, { from, to }).then((res) => res.text);
  }
}
