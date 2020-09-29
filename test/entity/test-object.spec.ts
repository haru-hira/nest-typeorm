import { TestObjects } from '../../src/entity/test-objects';

describe('TestObjects', () => {
  test('should be defined', () => {
    expect(new TestObjects()).toBeDefined();
  });
});
