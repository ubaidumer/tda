import { Test, TestingModule } from '@nestjs/testing';
import { OrgtypeController } from './orgtype.controller';

describe('OrgtypeController', () => {
  let controller: OrgtypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgtypeController],
    }).compile();

    controller = module.get<OrgtypeController>(OrgtypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
