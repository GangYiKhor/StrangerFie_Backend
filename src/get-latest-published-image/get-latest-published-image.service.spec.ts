import { Test, TestingModule } from '@nestjs/testing';
import { GetLatestPublishedImageService } from './get-latest-published-image.service';

describe('GetLatestPublishedImageService', () => {
  let service: GetLatestPublishedImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetLatestPublishedImageService],
    }).compile();

    service = module.get<GetLatestPublishedImageService>(GetLatestPublishedImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
