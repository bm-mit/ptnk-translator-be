import { Controller, Get, Param } from '@nestjs/common';
import { convertToText } from 'number-to-text';
import 'number-to-text/converters/en-us';

@Controller('to-text')
export class ToTextController {
  @Get('en/:number')
  getToTextResult(@Param('number') number: string) {
    console.log(number);
    return convertToText(number);
  }

  @Get('vi/:number')
  convertToVietnameseText(@Param('number') number: number | string): string {
    const UNITS = ['', 'nghìn', 'triệu', 'tỷ'];
    const DIGITS = [
      'không',
      'một',
      'hai',
      'ba',
      'bốn',
      'năm',
      'sáu',
      'bảy',
      'tám',
      'chín',
    ];

    // Helper to read three-digit groups
    function readThreeDigits(num: number): string {
      const hundreds = Math.floor(num / 100);
      const tens = Math.floor((num % 100) / 10);
      const ones = num % 10;
      let result = '';

      if (hundreds > 0) {
        result += `${DIGITS[hundreds]} trăm `;
      }

      if (tens > 1) {
        result += `${DIGITS[tens]} mươi `;
        if (ones === 1) result += 'mốt ';
        else if (ones > 0) result += `${DIGITS[ones]} `;
      } else if (tens === 1) {
        result += `mười `;
        if (ones > 0) result += `${DIGITS[ones]} `;
      } else if (ones > 0) {
        if (hundreds > 0) result += `lẻ `;
        result += `${DIGITS[ones]} `;
      }

      return result.trim();
    }

    // Read integer part
    function readIntegerPart(integer: number): string {
      if (integer === 0) return DIGITS[0];
      const parts = [];
      let groupIndex = 0;

      while (integer > 0) {
        const group = integer % 1000;
        if (group > 0) {
          const groupText = readThreeDigits(group);
          const unit = UNITS[groupIndex];
          parts.unshift(`${groupText} ${unit}`.trim());
        }
        integer = Math.floor(integer / 1000);
        groupIndex++;
      }

      return parts.join(' ').trim();
    }

    // Read decimal part
    function readDecimalPart(decimal: string): string {
      // Remove trailing zeros
      decimal = decimal.replace(/0+$/, '');
      return decimal
        .split('')
        .map((digit) => DIGITS[parseInt(digit)])
        .join(' ');
    }

    // Main function logic
    if (typeof number === 'string') {
      number = parseFloat(number);
    }

    const isNegative = number < 0;
    number = Math.abs(number); // Work with the absolute value

    const integerPart = Math.floor(number);
    const decimalPart = number % 1;

    const integerText = readIntegerPart(integerPart);
    const decimalText =
      decimalPart > 0
        ? `phẩy ${readDecimalPart(decimalPart.toFixed(10).split('.')[1])}`
        : '';

    const result = `${integerText} ${decimalText}`.trim();
    return isNegative ? `âm ${result}` : result;
  }
}
