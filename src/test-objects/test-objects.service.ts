import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestObjects } from './test-objects';
import { TestObjectsModule } from './test-objects.module';

@Injectable()
export class TestObjectsService {
  constructor(
    @InjectRepository(TestObjects)
    private readonly repository: Repository<TestObjects>,
  ) {}

  async all(): Promise<TestObjects[]> {
    return this.repository.find();
  }

  async one(id: number): Promise<TestObjects> {
    return this.repository.findOne(id);
  }

  async create(data: Partial<TestObjects>): Promise<TestObjects> {
    return this.repository.save(data);
  }

  async update(id: number, data: Partial<TestObjectsModule>): Promise<void> {
    const origin = await this.repository.findOne(id);
    const updateData = Object.assign(origin, data); // 上書き
    this.repository.save(updateData);
  }

  async remove(id: number): Promise<void> {
    const obj = await this.repository.findOne(id);
    this.repository.remove(obj);
  }
}