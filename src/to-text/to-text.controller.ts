import { Controller, Get, Param } from '@nestjs/common';
import { convertToText } from 'number-to-text';
import 'number-to-text/converters/en-us';

@Controller('to-text')
export class ToTextController {
  @Get('/:number')
  getToTextResult(@Param('number') number: string) {
    console.log(number);
    return convertToText(number);
  }
}
