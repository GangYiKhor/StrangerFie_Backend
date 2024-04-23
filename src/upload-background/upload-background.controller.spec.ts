import { Test, TestingModule } from '@nestjs/testing';
import { UploadBackgroundController } from './upload-background.controller';

describe('UploadBackgroundController', () => {
  let controller: UploadBackgroundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadBackgroundController],
    }).compile();

    controller = module.get<UploadBackgroundController>(UploadBackgroundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
