import { Test, TestingModule } from '@nestjs/testing';
import { BicycleTypeController } from './bicycle-type.controller';

describe('BicycleTypeController', () => {
  let controller: BicycleTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BicycleTypeController],
    }).compile();

    controller = module.get<BicycleTypeController>(BicycleTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
