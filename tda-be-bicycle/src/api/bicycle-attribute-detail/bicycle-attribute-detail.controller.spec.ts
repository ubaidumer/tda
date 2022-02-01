import { Test, TestingModule } from '@nestjs/testing';
import { BicycleAttributeDetailController } from './bicycle-attribute-detail.controller';

describe('BicycleAttributeDetailController', () => {
  let controller: BicycleAttributeDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BicycleAttributeDetailController],
    }).compile();

    controller = module.get<BicycleAttributeDetailController>(BicycleAttributeDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
