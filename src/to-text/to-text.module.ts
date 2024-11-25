import { Module } from '@nestjs/common';
import { ToTextController } from './to-text.controller';

@Module({
  controllers: [ToTextController]
})
export class ToTextModule {}
