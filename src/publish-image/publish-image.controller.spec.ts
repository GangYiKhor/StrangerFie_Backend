import { Test, TestingModule } from '@nestjs/testing';
import { PublishImageController } from './publish-image.controller';

describe('PublishImageController', () => {
  let controller: PublishImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublishImageController],
    }).compile();

    controller = module.get<PublishImageController>(PublishImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
