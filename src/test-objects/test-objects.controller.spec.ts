import { Test, TestingModule } from '@nestjs/testing';
import { TestObjectsController } from './test-objects.controller';

describe('TestObjects Controller', () => {
  let controller: TestObjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestObjectsController],
    }).compile();

    controller = module.get<TestObjectsController>(TestObjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
