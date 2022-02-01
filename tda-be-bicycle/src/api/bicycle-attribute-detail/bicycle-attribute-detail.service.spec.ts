import { Test, TestingModule } from '@nestjs/testing';
import { BicycleAttributeDetailService } from './bicycle-attribute-detail.service';

describe('BicycleAttributeDetailService', () => {
  let service: BicycleAttributeDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BicycleAttributeDetailService],
    }).compile();

    service = module.get<BicycleAttributeDetailService>(BicycleAttributeDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
