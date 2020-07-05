import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Question } from '../entity/question';
import { Category } from 'src/entity/category';
import { CreateQuestionDataDTO } from 'src/dto/question.dto';

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
}
