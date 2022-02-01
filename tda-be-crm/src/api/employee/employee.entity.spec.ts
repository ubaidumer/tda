import { Employee } from './employee.entity';

describe('Employee', () => {
  it('should be defined', () => {
    expect(new Employee()).toBeDefined();
  });
});
