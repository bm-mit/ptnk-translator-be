import { Test, TestingModule } from '@nestjs/testing';
import { ToTextController } from './to-text.controller';

describe('ToTextController', () => {
  let controller: ToTextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToTextController],
    }).compile();

    controller = module.get<ToTextController>(ToTextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
