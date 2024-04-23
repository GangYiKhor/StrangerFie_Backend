import { Test, TestingModule } from '@nestjs/testing';
import { CompleteImageController } from './complete-image.controller';

describe('CompleteImageController', () => {
  let controller: CompleteImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompleteImageController],
    }).compile();

    controller = module.get<CompleteImageController>(CompleteImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
