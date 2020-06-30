import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { TestObjects } from './test-objects';
import { TestObjectsModule } from './test-objects.module';

@Injectable()
export class TestObjectsService {
  constructor(
    @InjectRepository(TestObjects)
    private readonly repository: Repository<TestObjects>,
    @InjectConnection()
    private readonly connection: Connection,
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
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const origin = await queryRunner.manager
        .getRepository(TestObjects)
        .createQueryBuilder('test-objects')
        .useTransaction(true)
        .setLock('pessimistic_write')
        .where('test-objects.id = :id', { id: id })
        .getOne();
      const updateData = Object.assign(origin, data); // 上書き
      await queryRunner.manager.save(updateData);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const obj = await this.repository.findOne(id);
    this.repository.remove(obj);
  }
}