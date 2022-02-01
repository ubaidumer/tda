import { Test, TestingModule } from '@nestjs/testing';
import { BicycleAttributeController } from './bicycle-attribute.controller';

describe('BicycleAttributeController', () => {
  let controller: BicycleAttributeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BicycleAttributeController],
    }).compile();

    controller = module.get<BicycleAttributeController>(BicycleAttributeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
