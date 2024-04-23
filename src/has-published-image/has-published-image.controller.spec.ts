import { Test, TestingModule } from '@nestjs/testing';
import { HasPublishedImageController } from './has-published-image.controller';

describe('HasPublishedImageController', () => {
  let controller: HasPublishedImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HasPublishedImageController],
    }).compile();

    controller = module.get<HasPublishedImageController>(HasPublishedImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
