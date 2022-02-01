import { Test, TestingModule } from '@nestjs/testing';
import { OrgtypeService } from './orgtype.service';

describe('OrgtypeService', () => {
  let service: OrgtypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgtypeService],
    }).compile();

    service = module.get<OrgtypeService>(OrgtypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
