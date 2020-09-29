import { Test, TestingModule } from '@nestjs/testing';
import { TestObjectsService } from '../../src/service/test-objects.service';

describe('TestObjectsService', () => {
  let service: TestObjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestObjectsService],
    }).compile();

    service = module.get<TestObjectsService>(TestObjectsService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});
