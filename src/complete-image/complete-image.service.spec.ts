import { Test, TestingModule } from '@nestjs/testing';
import { CompleteImageService } from './complete-image.service';

describe('CompleteImageService', () => {
  let service: CompleteImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompleteImageService],
    }).compile();

    service = module.get<CompleteImageService>(CompleteImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
