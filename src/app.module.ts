import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TranslateController } from './translate/translate.controller';
import { TranslateModule } from './translate/translate.module';
import { TtsModule } from './tts/tts.module';
import { ToTextModule } from './to-text/to-text.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TranslateModule, TtsModule, ToTextModule],
  controllers: [TranslateController],
  providers: [],
})
export class AppModule {}
