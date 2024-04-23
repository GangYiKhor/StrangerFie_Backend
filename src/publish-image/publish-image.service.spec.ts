import { Test, TestingModule } from '@nestjs/testing';
import { PublishImageService } from './publish-image.service';

describe('PublishImageService', () => {
  let service: PublishImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublishImageService],
    }).compile();

    service = module.get<PublishImageService>(PublishImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
