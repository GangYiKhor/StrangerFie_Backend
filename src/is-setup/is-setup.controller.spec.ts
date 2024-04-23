import { Test, TestingModule } from '@nestjs/testing';
import { IsSetupController } from './is-setup.controller';

describe('IsSetupController', () => {
  let controller: IsSetupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IsSetupController],
    }).compile();

    controller = module.get<IsSetupController>(IsSetupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
