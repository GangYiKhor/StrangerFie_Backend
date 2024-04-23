import { Test, TestingModule } from '@nestjs/testing';
import { GetLatestPublishedImageController } from './get-latest-published-image.controller';

describe('GetLatestPublishedImageController', () => {
  let controller: GetLatestPublishedImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetLatestPublishedImageController],
    }).compile();

    controller = module.get<GetLatestPublishedImageController>(GetLatestPublishedImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
