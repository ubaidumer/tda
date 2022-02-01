import { Test, TestingModule } from '@nestjs/testing';
import { BicycleFrameController } from './bicycle-frame.controller';

describe('BicycleFrameController', () => {
  let controller: BicycleFrameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BicycleFrameController],
    }).compile();

    controller = module.get<BicycleFrameController>(BicycleFrameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
