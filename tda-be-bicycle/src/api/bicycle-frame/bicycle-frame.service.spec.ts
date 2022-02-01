import { Test, TestingModule } from '@nestjs/testing';
import { BicycleFrameService } from './bicycle-frame.service';

describe('BicycleFrameService', () => {
  let service: BicycleFrameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BicycleFrameService],
    }).compile();

    service = module.get<BicycleFrameService>(BicycleFrameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
