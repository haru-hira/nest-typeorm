import { TestObjects } from '../../src/entity/test-objects';

describe('TestObjects', () => {
  it('should be defined', () => {
    expect(new TestObjects()).toBeDefined();
  });
});
