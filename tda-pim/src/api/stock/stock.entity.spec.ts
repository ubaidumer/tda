import { Stock } from './stock.entity';

describe('Stock', () => {
  it('should be defined', () => {
    expect(new Stock()).toBeDefined();
  });
});
