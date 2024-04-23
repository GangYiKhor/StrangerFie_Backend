import { Test, TestingModule } from '@nestjs/testing';
import { UploadBackgroundService } from './upload-background.service';

describe('UploadBackgroundService', () => {
  let service: UploadBackgroundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadBackgroundService],
    }).compile();

    service = module.get<UploadBackgroundService>(UploadBackgroundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
