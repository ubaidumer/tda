import { Test, TestingModule } from '@nestjs/testing';
import { BicycleAttributeService } from './bicycle-attribute.service';

describe('BicycleAttributeService', () => {
  let service: BicycleAttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BicycleAttributeService],
    }).compile();

    service = module.get<BicycleAttributeService>(BicycleAttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
