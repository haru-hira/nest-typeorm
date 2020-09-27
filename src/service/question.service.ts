import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Question } from '../entity/question';
import { Category } from '../entity/category';
import { CreateQuestionDataDTO, UpdateQuestionDataDTO } from '../dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async all(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['categories'] });
  }

  async one(id: number): Promise<Question> {
    return this.questionRepository.findOne(id, { relations: ['categories'] });
  }

  async create(data: Partial<CreateQuestionDataDTO>): Promise<Question> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const categories: Category[] = [];
      if (data.categories) {
        for (const name of data.categories) {
          let category = await this.categoryRepository.findOne({ name: name });
          if (!category) {
            // Categoryが存在しない場合、CategoryもCreate。
            category = new Category();
            category.name = name;
            await queryRunner.manager.save(category);
          }
          categories.push(category);
        }
      }

      const question = new Question();
      question.title = data.title;
      question.text = data.text;
      question.categories = categories;
      await queryRunner.manager.save(question);

      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, data: Partial<UpdateQuestionDataDTO>): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const question = await queryRunner.manager.findOne(Question, id, { relations: ['categories'] });
      if (question) {
        const updatedQuestion = Object.assign(question, data);
        if (data.categories) {
          const categories: Category[] = [];
          for (const name of data.categories) {
            let category = await this.categoryRepository.findOne({ name: name });
            if (!category) {
              // Categoryが存在しない場合、CategoryもCreate。
              category = new Category();
              category.name = name;
              await queryRunner.manager.save(category);
            }
            categories.push(category);
          }
          question.categories = categories;
        }
        await queryRunner.manager.save(updatedQuestion);
      }
      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const question: Question = await queryRunner.manager.findOne(Question, id, { relations: ['categories'] });
      if (question) {
        // question_categories_category の関連レコードもこれで削除される。category のレコードは残る。(今回はそれでOK)
        await queryRunner.manager.remove(question);
      }
      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
