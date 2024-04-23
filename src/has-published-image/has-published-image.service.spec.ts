import { Test, TestingModule } from '@nestjs/testing';
import { HasPublishedImageService } from './has-published-image.service';

describe('HasPublishedImageService', () => {
  let service: HasPublishedImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HasPublishedImageService],
    }).compile();

    service = module.get<HasPublishedImageService>(HasPublishedImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
