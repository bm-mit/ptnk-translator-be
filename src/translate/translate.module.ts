import { Module } from '@nestjs/common';
import { TranslateController } from './translate.controller';

@Module({
  imports: [],
  controllers: [TranslateController],
  providers: [],
})
export class TranslateModule {}
