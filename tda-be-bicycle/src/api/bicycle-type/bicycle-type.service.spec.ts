import { Test, TestingModule } from '@nestjs/testing';
import { BicycleTypeService } from './bicycle-type.service';

describe('BicycleTypeService', () => {
  let service: BicycleTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BicycleTypeService],
    }).compile();

    service = module.get<BicycleTypeService>(BicycleTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
