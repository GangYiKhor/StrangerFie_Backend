import { Test, TestingModule } from '@nestjs/testing';
import { IsSetupService } from './is-setup.service';

describe('IsSetupService', () => {
  let service: IsSetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IsSetupService],
    }).compile();

    service = module.get<IsSetupService>(IsSetupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
