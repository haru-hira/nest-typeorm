import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Connection, TreeRepository } from 'typeorm';
import { Closure } from 'src/entity/closure';
import { CreateClosureDataDTO } from 'src/dto/closure.dto';

@Injectable()
export class ClosureService {
  constructor(
    @InjectRepository(Closure)
    private readonly closureRepository: TreeRepository<Closure>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async create(parentId: number, dto: CreateClosureDataDTO): Promise<Closure[]> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (parentId <= 0) {
        const root = new Closure();
        root.name = dto.name;
        // await this.closureRepository.save(root);
        await queryRunner.manager.save(root);
      } else {
        const parent = await this.closureRepository.findOne(parentId);
        if (parent) {
          const child = new Closure();
          child.name = dto.name;
          child.parent = parent;
          // await this.closureRepository.save(child);
          await queryRunner.manager.save(child);
        }
      }
      await queryRunner.commitTransaction();
      const closures = await this.closureRepository.findTrees();
      /* const results = [];
      for (const closure of closures) {
        const result = await this.closureRepository.findOne(closure, {});
        results.push(result);
      } */
      return closures;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
